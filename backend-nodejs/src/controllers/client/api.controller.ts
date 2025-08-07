import { Request, Response } from "express";
import { handleGetAllUser, handleGetAllUserByID, handleUpdateUserById, handleUserLogin } from "services/client/api.service";
import { registerNewUser } from "services/client/auth.service";
import { handleDeleteUser, hashPassword } from "services/user.services";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";

const getAllUserAPI = async (req: Request, res: Response) => {
    const users = await handleGetAllUser()
    console.log(req.user)
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

const deleteUserByIdAPI = async (req: Request, res: Response) => {
    const {id} = req.params
    const users = await handleDeleteUser(+id)
    res.status(200).json({
        data: "Delete user successed"
    })
}

const loginAPI = async (req: Request, res: Response) => {

    const {username, password} = req.body;
    try {
        const access_token = await handleUserLogin(username, password)
        res.status(200).json({
            data: access_token
        })
    } catch (err) {
        res.status(401).json({
            data:null,
            message: "invalid username/password"
        })
    }
}

const logoutAPI = async (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                message: "Logout failed"
            })
        }
        res.status(200).json({
            message: "Logout success"
        })
    })
}

const fetchAccountAPI = async (req: Request, res: Response) => {
    const user = req.user;
        res.status(200).json({
            data: user
        })
}


export { getAllUserAPI, getAllUserAPIByID, createUserAPI,updateUserByIdAPI,deleteUserByIdAPI, loginAPI, fetchAccountAPI }