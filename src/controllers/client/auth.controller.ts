import { error } from "console";
import { Request, Response } from "express";
import { registerNewUser } from "services/client/auth.service";
import { hashPassword } from "services/user.services";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";

const getRegisterPage = (req: Request, res: Response) => {
    const errors: any = [];
    const oldData = {
        fullName: "", email: "", password: "", confirmPassword: ""
    }
    res.render("client/auth/register.ejs", {errors, oldData})
}

const getLoginPage = (req: Request, res: Response) => {
    res.render("client/auth/login.ejs")
}

const postRegister = async (req: Request, res: Response) => {
    const {fullName, email, password, confirmPassword} = req.body as TRegisterSchema
    console.log(req.body)
    const validate = await RegisterSchema.safeParseAsync(req.body)
    if(!validate.success){
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${String(item.path[0])})`)
        const oldData = {fullName, email, password, confirmPassword}
        res.render("client/auth/register.ejs",{errors, oldData})
    }
    await registerNewUser(fullName, email, await hashPassword(password))
    res.redirect("/login")
}

export {getRegisterPage, getLoginPage, postRegister}