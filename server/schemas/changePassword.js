import zod from 'zod';


const changePasswordSchema = zod.object({

    oldPassword: zod.string().min(8, "password should be greater than 8 characters"),
    newPassword:zod.string().trim().min(8,"password should be greater than 8 characters")

})

export default changePasswordSchema;