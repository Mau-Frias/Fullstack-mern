import { z } from 'zod';

// Define Zod schema for user validation
const userSchema = z.object({
    name: z
        .string()
        .min(5, 'Name must be at least 5 characters long')
        .max(10, 'Name must be at most 10 characters long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    isAdmin: z.boolean().optional()
});

export default userSchema;
