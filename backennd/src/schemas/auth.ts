import { z } from 'zod';
import { PASSWORD_REGEX } from '../configuration/regex';

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, { message: 'Password is too short' }).max(20, { message: 'Password is too long' }).regex(PASSWORD_REGEX, {
        message: 'Invalid format',
    }),
});

export const registerSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, { message: 'Password is too short' }).max(20, { message: 'Password is too long' }).regex(PASSWORD_REGEX, {
        message: 'Invalid format',
    }),
});
