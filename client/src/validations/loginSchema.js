import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password should have min 8 characters"),
})

export  {loginSchema}