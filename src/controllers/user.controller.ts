import { Request, Response } from "express"
import { getAllUsers, handleCreateUser, handleDeleteUser, handleViewUser, handleUpdateUser } from "services/user.services"



const getHomePage = async (req: Request, res: Response) => {
   const users = await getAllUsers()
   res.render('home.ejs', { users: users })
}


const postCreateUser = async (req: Request, res: Response) => {
   const info = req.body
   const { name, email, phone, role, address } = info
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
   res.render("view-user", { user: user })
}

const postUpdateUser = async (req: Request, res: Response) => {
   const user = req.body
   const userId = req.params.id
   const { name, email, address } = user
   await handleUpdateUser(userId, name, email, address)
   res.redirect("/")
}

export { getHomePage, postCreateUser, postDeleteUser, getViewUserById, postUpdateUser }