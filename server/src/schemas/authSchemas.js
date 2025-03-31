import { z } from 'zod';

console.log('Initializing auth schemas'); // Debug log

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const registerSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    isAdmin: z.boolean().optional(),
});

console.log('Auth schemas initialized'); // Debug log
