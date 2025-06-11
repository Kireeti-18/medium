import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    name: z.string().min(1, 'Name is required')
});
 
export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long')
});


export type SignupSchema = z.infer<typeof signinSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;