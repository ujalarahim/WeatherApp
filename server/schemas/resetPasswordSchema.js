import z from "zod";

const resetPasswordSchema = z.object({
    password: z.string().min(8, "password should be greater than 8 characters"),
    confirmPassword: z.string().min(8, "password should be greater than 8 characters"),
})


export default resetPasswordSchema