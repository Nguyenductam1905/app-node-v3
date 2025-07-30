import { postUpdateUser } from "controllers/user.controller";
import { Request, Response } from "express";
import { handleGetAllUser, handleGetAllUserByID, handleUpdateUserById } from "services/client/api.service";
import { registerNewUser } from "services/client/auth.service";
import { addProductToCart } from "services/client/item.service";
import { handleAdminUpdateUser, hashPassword } from "services/user.services";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";

const getAllUserAPI = async (req: Request, res: Response) => {
    const users = await handleGetAllUser()
    res.status(200).json({
        data: users
    })
}

const getAllUserAPIByID = async (req: Request, res: Response) => {
    const userID = req.params.id
    const users = await handleGetAllUserByID(userID)
    res.status(200).json({
        data: users
    })
}

const createUserAPI = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema
    // console.log(req.body)
    const validate = await RegisterSchema.safeParseAsync(req.body)
    if (!validate.success) {
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${String(item.path[0])})`)
        res.status(400).json({
            errors: errors
        })
    }
    await registerNewUser(fullName, email, await hashPassword(password))
    res.status(201).json()
}

const updateUserByIdAPI = async (req: Request, res: Response) => {
    const {id} = req.params
    const { fullName, address, phone, avatar } = req.body
    console.log(req.body)
    await handleUpdateUserById(+id, fullName, address, phone, avatar)
    res.status(200).json({
        data: "update user successed"
    })
}

export { getAllUserAPI, getAllUserAPIByID, createUserAPI,updateUserByIdAPI }