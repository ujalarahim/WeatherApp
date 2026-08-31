import * as z from "zod";

const registrationSchema = z.object({
    name: z.string().min(3, "name should have min 3 characters"),
    email: z.string().email(),
    password: z.string().min(8, "password should have min 8 characters"),
    gender: z.enum(["male", "female", "others"]),
})

export  {registrationSchema}