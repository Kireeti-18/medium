import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    name: z.string().min(1, 'Name is required')
});
 
export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password should not be empty')
});


export type SignupSchema = z.infer<typeof signinSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;