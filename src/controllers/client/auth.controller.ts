
import { prisma } from "config/client";
import { NextFunction, Request, Response } from "express";
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

    const session = req.session as any;
    let messages = session?.messages ?? []
    res.render("client/auth/login.ejs", {messages})
}

const postRegister = async (req: Request, res: Response) => {
    const {fullName, email, password, confirmPassword} = req.body as TRegisterSchema
    console.log(req.body)
    const validate = await RegisterSchema.safeParseAsync(req.body)
    if(!validate.success){
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${String(item.path[0])})`)
        const oldData = {fullName, email, password, confirmPassword}
        res.render("client/auth/register.ejs", {errors, oldData})
    }
    await registerNewUser(fullName, email, await hashPassword(password))
    res.redirect("/login")
}

const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {id: +id},
        //delete password
        omit: {
            password: true
        },
        //use relation bettween role and roleId
        include: {
            role: true
        }
    })
    return user
}

const getSuccessRedirectPage = (req: Request, res: Response) => {
    const user = req.user as any;
    if (user?.role?.name === "ADMIN"){
        res.redirect("/admin")
    }
    else res.redirect("/")
}

const postLogout = (req: Request, res: Response, next: NextFunction) => {
    req.logOut(function(err){
        if(err){return next(err)}
        return res.redirect("/");
    })
}

export {getRegisterPage, getLoginPage, postRegister, getUserWithRoleById, getSuccessRedirectPage, postLogout}