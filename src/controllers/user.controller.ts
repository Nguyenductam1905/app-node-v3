import { Request, Response } from "express"
import { getAllUsers, handleCreateUser, handleDeleteUser, handleViewUser, handleUpdateUser } from "services/user.services"



const getHomePage = async (req:Request, res:Response) => {
   const users = await getAllUsers()
   res.render('home.ejs', {users: users})
}

const getCreateUserPage = (req:Request, res:Response) => {
   res.render("create-user")
}

const postCreateUser = async (req:Request, res:Response) => {
   const info = req.body
   const {name, email, address} = info
   await handleCreateUser(name, email, address)
   res.redirect("/")
}

const postDeleteUser = async (req: Request, res: Response) => {
   const idUser = req.params.id
   await handleDeleteUser(idUser)
   res.redirect("/")
}

const getViewUserById = async (req: Request, res: Response) => {
   const idUser = req.params.id
   const user = await handleViewUser(idUser)
   res.render("view-user", {user: user})
}

const postUpdateUser = async (req: Request, res: Response) => {
   const user = req.body
   const userId = req.params.id
   const {name, email, address} = user
   await handleUpdateUser(userId, name, email, address)
   res.redirect("/")
}

export {getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUserById, postUpdateUser}