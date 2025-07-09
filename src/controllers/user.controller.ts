import { Request, Response } from "express"
import { getAllUsers, handleCreateUser, handleDeleteUser, handleViewUser, handleUpdateUser, getAllRoles } from "services/user.services"



const getHomePage = async (req: Request, res: Response) => {
   
   res.render('client/home/show.ejs')
}


const postCreateUser = async (req: Request, res: Response) => {
   const info = req.body
   const { name, email, phone, role, address } = info
   console.log(info)
   const file = req.file
   const avatar = file?.filename
   await handleCreateUser(name, email, address, phone, avatar, role)
   res.redirect("/admin/user")
}

const postDeleteUser = async (req: Request, res: Response) => {
   const idUser = req.params.id
   await handleDeleteUser(idUser)
   res.redirect("/admin/user")
}

const getViewUserById = async (req: Request, res: Response) => {
   const idUser = req.params.id
   const user = await handleViewUser(idUser)
   const roles = await getAllRoles()
   res.render("admin/user/detail.ejs", { user: user, roles })
}

const postUpdateUser = async (req: Request, res: Response) => {
   const user = req.body
   const userId = req.params.id
   const { name, email, address, phone, role, avatar } = user
   console.log(user)
   await handleUpdateUser(+userId, name, email, address, phone, +role, avatar)
   res.redirect("/")
}

export { getHomePage, postCreateUser, postDeleteUser, getViewUserById, postUpdateUser }