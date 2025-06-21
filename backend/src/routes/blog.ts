import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { BlogUpdateData } from "../interfaces"
import { isTokenExpired, getUserIdFromToken } from  "../services"
import {createBlogSchema, updateBlogSchema, deleteBlogSchema} from '@kireeti1887/medium-common-mod'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        prisma: any
    }
}>()

blogRouter.use('/*', async (c, next) => {

    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    
    try {
        const isExpired = isTokenExpired(token)
     
        if (isExpired)
        {
            return c.json({ type: 'invalid_token', msg: 'Token expired Signin again' }, 401);
        }
        const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
        await next()
    } 
    catch (err) {
        return c.json({ 
            error: 'Invalid token, login again',
            type: 'invalid_token'
         }, 401);
    }
})

blogRouter.post('/', async(c) => {
    const prisma = c.get('prisma');
    const body = await c.req.json()
    const {success, error} = createBlogSchema.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({ error: `Invalid request body ${error}` })
    }
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
  
blogRouter.put('/', async(c) => {
    const prisma = c.get('prisma');
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    const userId = getUserIdFromToken(token)
    const body = await c.req.json()

    const {success, error} = updateBlogSchema.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({ error: `Invalid request body ${error}` })
    }
    
    const blog = await prisma.blog.findFirst({
        where: { id : body.blogId },
        select: {
          id: true,
          authorId: true,
        }
    });

    if (!blog) {
        return c.json({ error: 'Blog not found' }, 404);
    }

    if (userId !== blog.authorId) 
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
    } 
    catch (error: any) {
        return c.json({ error: 'Internal server error' }, 500);
    }
})

blogRouter.delete('/', async(c) => {
    const prisma = c.get('prisma');
  
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
  
    const userId = getUserIdFromToken(token)
  
    const body = await c.req.json()

    const {success, error} = deleteBlogSchema.safeParse(body)
    if (!success) {
        c.status(400)
        return c.json({ error: `Invalid request body ${error}` })
    }
    
    const blog = await prisma.blog.findFirst({
        where: { id : body.blogId },
        select: {
          id: true,
          authorId: true,
        }
    });

    if (!blog) {
        return c.json({ error: 'Blog not found' }, 404);
    }

    if (userId !== blog.authorId) 
    {
        return c.json({ error: 'User not allowed to delete' }, 500);
    }
  
  
    try {
        await prisma.blog.delete({
            where: { id : body.blogId },
        });
  
        return c.json({msg:"blog deleted successfully"}, 200);
    } 
    catch (error: any) {
        return c.json({ error: 'Internal server error' }, 500);
    }
})

blogRouter.get('/:blogId', async(c) => {
   
    const prisma = c.get('prisma');

    const blogId = c.req.param('blogId');
    try {
        const blog = await prisma.blog.findFirst({
            where: { id : blogId },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                author: {
                    select: {
                        id:true,
                        email:true,
                        name: true,
                        avathar: true
                    },
                  },
            }
         });
  
        if (!blog){
            c.status(404)
            c.json({error: "Blog not found"})
        }
        return c.json({blog})
    } 
    catch (error: any) {
        return c.json({ error: `Internal server error ${error}` }, 500);
    }
})
  
blogRouter.get('/blogs/list', async (c) => {
    const limit: number = 10;
    const prisma = c.get('prisma');

    const params = c.req.queries();
    const paramsData: any = {
        published: params.published ? (params.published[0] === 'true') : true,
    };
    if (params.userId) {
        paramsData.authorId = { in: params.userId };
    }

    const page = params.page ? parseInt(params.page[0]) : 1;
    if (page < 1) {
        return c.json({ error: 'Invalid page number' }, 400);
    }
    const skip = (page - 1) * limit;

    try {
        const blogs = await prisma.blog.findMany({
            skip,
            take: limit,
            where: paramsData,
            select: {
              id: true,
              title: true,
              content: true,
              authorId: true,
              createdAt: true,
              author: {
                select: {
                  name: true,
                  avathar: true
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
          

        const count = await prisma.blog.count({
            where: paramsData,
        });

        if (!blogs || blogs.length === 0) {
            return c.json({
                blogs: [],
                total_count: 0,
            } ,500);
        }

        return c.json({
            blogs,
            total_count: count,
            page,
        });

    } catch (error: any) {
        return c.json({ error: `Internal server error: ${error.message || error}` }, 500);
    }
});

  