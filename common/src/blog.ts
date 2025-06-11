import z from 'zod';


export const createBlogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    published: z.boolean().optional(),
    userId: z.string()
});

export const updateBlogSchema = z.object({
    blogId: z.string().min(1, 'ID is required'),
    title: z.string().min(1, 'Title is required').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    published: z.boolean().optional()
});

export const deleteBlogSchema = z.object({
    blogId: z.string().min(1, 'ID is required'),
});

// export const singleBlogSchema =  z.string().min(1, "Invalid blogId");


// export const bulkBlogsSchema = z.object({
//     userId: z.string().optional(),
//     published: z.string().optional(),
// })

export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;
export type DeleteBlogSchema = z.infer<typeof deleteBlogSchema>;
// export type SingleBlogSchema = z.infer<typeof singleBlogSchema>;
// export type BulkBlogsSchema = z.infer<typeof bulkBlogsSchema>;