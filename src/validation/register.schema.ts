import { prisma } from "config/client"
import z, { email } from "zod"

const isEmailExist = async (email:string) => {
    const user = await prisma.user.findUnique({
        where: {username: email}
    })
    if(user){ return true; }
    return false
}

const passwordSchema = z.string()
        .min(6, {message: "Password tối thiểu 6 kí tự"})
        .max(20, {message: "Password tối đa có 20 kí tự"})

export const RegisterSchema = z.object({
    fullName: z.string().min(1, {message: "Tên không được để trống"}),
    email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .refine(async (e) => {
        const existingUser = await isEmailExist(e);
        return !existingUser
    },{
        message:"Email already exists",
        path: ["email"],
    }),
    password: passwordSchema,
    confirmPassword: z.string().min(4)
})
.refine((data)=> data.confirmPassword === data.password, {
    message: "Password Confirm không chính xác",
    path: ['confirmPassword']
})
export type TRegisterSchema = z.infer<typeof RegisterSchema>