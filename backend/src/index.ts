import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, decode, sign } from 'hono/jwt'
import bcrypt from 'bcryptjs';
import { BlogUpdateData } from "./interfaces"
import { isTokenExpired, getUserIdFromToken } from  "./services"
import { error } from 'console';



const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()


// Middleware
app.use('/api/v1/blog/*', async (c, next) => {

  const authHeader = c.req.header("authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  
  try {
    const isExpired = isTokenExpired(token)
   
    if (isExpired)
    {
      return c.json({ msg: 'Token expired Signin again' }, 401);
    }
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    await next()
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 401);
  }
})


app.post('/api/v1/user/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

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
  } catch (error) {
    c.status(500)
    return c.json({ error: 'Failed to create user' })
  }
})

app.post('/api/v1/user/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
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

app.post('/api/v1/blog', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json()
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: body.userId,
        published: body.published ?? false
      }
    })
    if (!blog) {
      c.status(404)
      return c.json({ msg: 'Failed while creating blog' });
    }
    return c.json({ msg: 'Blog created', blog});
  }
  catch(e)
  {
    c.status(403)
    return c.json({ error: 'Error while creating blog' })
  }
})

app.put('/api/v1/blog', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const authHeader = c.req.header("authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  const userId = getUserIdFromToken(token)

  const body = await c.req.json()

  if (userId != body.userId)
  {
    return c.json({ error: 'User not allowed to update' }, 500);
  }

  const updateData: BlogUpdateData = {};
  if (body.title !== undefined) updateData.title = body.title;
  if (body.content !== undefined) updateData.content = body.content;
  if (body.published !== undefined) updateData.published = body.published;

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id : body.blogId },
      data: updateData,
    });

    return c.json(updatedBlog, 200);
  } catch (error: any) {
    return c.json({ error: 'Internal server error' }, 500);
  }
})

app.get('/api/v1/blog/:id', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogId = c.req.param('id');
  try {
    const blog = await prisma.blog.findFirst({
      where: { id : blogId },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
      }
    });

    if (!blog){
      c.status(404)
      c.json({error: "Blog not found"})
    }
    return c.json({blog})
  } catch (error: any) {
    return c.json({ error: `Internal server error ${error}` }, 500);
  }
})

app.get('/api/v1/blogs/list', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const params = c.req.queries()
  const paramsData: any = {};
  if (params.userId) paramsData.authorId = {in : params.userId} 

  try {
    const blog = await prisma.blog.findMany({
      where: paramsData,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!blog){
      c.status(404)
      return c.json({error: "Blog not found"})
    }
    return c.json({blog})
  } catch (error: any) {
    return c.json({ error: `Internal server error ${error}` }, 500);
  }

})

export default app
 