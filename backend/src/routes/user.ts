import { Hono } from 'hono'
import {  sign } from 'hono/jwt'
import bcrypt from 'bcryptjs';

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

    try {

        const saltRounds = 5; 
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                pass: hashedPassword
            },  
        })
        const exp = Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60; 
        const token = await sign({ id: user.id, exp }, c.env.JWT_SECRET);

        return c.json({token, email: user.email, id: user.id})
    } 
    catch (error) {
        c.status(500)
        return c.json({ error: 'Failed to create user' })
    }
})

userRouter.post('/signin', async(c) => {
    const prisma = c.get('prisma');
    const body = await c.req.json()
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
        return c.json({token, email: user.email, id: user.id})

    }
    catch(e)
    {
        c.status(500)
        return c.json({ error: 'Failed to signin' })
    }
})