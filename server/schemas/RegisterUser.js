import * as z from 'zod';


const registerUserSchema = z.object({

    name: z.string().min(3, "name should be greater than 3"),
    email: z.email().lowercase(),
    password: z.string().min(8, "password should be greater than 8"),
    gender: z.enum(["male", "female", "others"], "gender should be either male or female or others"),

})


export default registerUserSchema