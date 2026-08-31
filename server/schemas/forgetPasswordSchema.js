import zod from "zod";


const forgetPasswordSchema = zod.object({
    email:zod.email().lowercase().trim(),
})


export default forgetPasswordSchema;
