import * as z from "zod";


const postSchema = z.object({
    title: z.string().min(3, "Title should have at least 3 characters").max(50, "Title should have at most 50 characters"),
    description: z.string().min(10, "Description should have at least 10 characters").max(100, "Description should have at most 100 characters"),
})

export {postSchema}