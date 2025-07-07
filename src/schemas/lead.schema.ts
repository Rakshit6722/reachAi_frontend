import * as z from 'zod'

export type createLeadPayload = {
    email: string,
    firstName: string,
    lastName: string,
    company: string
}

export type csvPayload = FormData

export const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    company: z.string().min(1, 'Company name is required')
})

export type FormValues = z.infer<typeof formSchema>