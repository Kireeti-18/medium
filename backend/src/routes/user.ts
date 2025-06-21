import { Hono } from 'hono'
import {  sign } from 'hono/jwt'
import bcrypt from 'bcryptjs';
import {signinSchema, signupSchema} from '@kireeti1887/medium-common-mod'
import { isTokenExpired, getUserIdFromToken, getAvatharFromName} from  "../services"

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    },
    Variables: {
      prisma: any
    }
  }>()

userRouter.post('/signup', async(c) => {
  
    const prisma = c.get('prisma');
    const body = await c.req.json()
    const {success, error} = signupSchema.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({ error: `Invalid request body ${error}` })
    }
    try {

        const saltRounds = 5; 
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        const name = body.name
        const avathar = await getAvatharFromName(name)
        const user = await prisma.user.create({
            data: {
                name: name,
                email: body.email,
                pass: hashedPassword,
                avathar: avathar
            },  
        })
        const exp = Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60; 
        const token = await sign({ id: user.id, exp }, c.env.JWT_SECRET);

        return c.json({
            token,  
            user: {
                    email: user.email,
                    id: user.id,
                    name: user.name,
                    avathar: user.avathar
                },
            }) 
    } 
    catch (error) {
        c.status(500)
        return c.json({ error: 'Failed to create user' })
    }
})

userRouter.post('/signin', async(c) => {

    const authHeader = c.req.header("authorization") || "Bearer ";
    const token = authHeader.replace("Bearer ", "");
    const prisma = c.get('prisma');

    if (token.length > 0)
    {
        const isExpired = isTokenExpired(token)

        if(!isExpired){
            const userId = getUserIdFromToken(token)
            if (userId.length > 0)
            {
                const user = await prisma.user.findUnique({
                    where:{
                        id: userId
                    }
                })

                if(user)
                {
                    return c.json({
                        token,  
                        user: {
                            email: user.email,
                            id: user.id, 
                            name: user.name,
                            avathar: user.avathar
                        }, 
                    })
                } 
            }
        }
    }

    const body = await c.req.json()
    const {success, error} = signinSchema.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({ error: `Invalid request body ${error}` })
    }
    try {
        const user = await prisma.user.findUnique({
            where:{
                email: body.email
            }
        })

        if (!user) {
            c.status(500)
            return c.json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(body.password, user.pass);

        if (!isPasswordValid) {
            c.status(401)
            return c.json({ error: 'Invalid password' });
        }

        const exp = Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60; 
        const token = await sign({ id: user.id, exp }, c.env.JWT_SECRET);
        return c.json({
            token,  
            user: {
                email: user.email,
                id: user.id, 
                name: user.name,
                avathar: user.avathar
            }, 
        }) 
    }
    catch(e)
    {
        c.status(500)
        return c.json({ error: 'Failed to signin' })
    }
})