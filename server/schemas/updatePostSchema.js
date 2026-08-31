import * as z from "zod";

const updatePostSchema = z.object({
    title: z.string().min(3, "title should be greater than 3").max(50, "title should be less than 50"),
    description: z.string().min(10, "description should be greater than 10").max(100, "description should be less than 100"),
})

export default updatePostSchema
