import { z, ZodType } from 'zod'; // Add new import
import type { LoginAuth, RegisterAuth } from '../models/auth';
import { PASSWORD_REGEX } from '../constants/regex';

export const UserRegisterSchema: ZodType<RegisterAuth> = z
    .object({
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: 'Password is too short' })
            .max(20, { message: 'Password is too long' })
            .regex(PASSWORD_REGEX, {
                message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const UserLoginSchema: ZodType<LoginAuth> = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: 'Password is too short' })
        .max(20, { message: 'Password is too long' })
        .regex(PASSWORD_REGEX, {
            message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
        }),
});
