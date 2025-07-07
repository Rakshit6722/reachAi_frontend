import type { forgotPasswordSchema, loginSchema, resetPasswordSchema } from '@schemas/auth.schema';
import {z} from 'zod';

export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;


export type loginServicePayload = {
    email: string,
    password: string,
}

export type SignupServicePayload = {
    email: string,
    name: string,
    password: string
}

export type forgotPasswordPayload = {
    email: string
}

export type resetPasswordPayload = {
    token: string;
    password: string
}

export type User = {
    id: number,
    name: string,
    email: string,
}

export type AuthState = {
    user: User | null,
    setUser: (user: User) => void,
    logout: () => void
}
