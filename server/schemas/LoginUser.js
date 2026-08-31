import * as z from 'zod';


const LoginUserSchema = z.object({
    email: z.email().lowercase().trim(),
    password: z.string().min(8, "password should be greater than 8"),
})


export default LoginUserSchema