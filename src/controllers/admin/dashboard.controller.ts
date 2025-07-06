import { Request, Response } from "express"
import { getAllUsers } from "services/user.services"


const getDashboardPage = (req: Request, res: Response) => {
    res.render('admin/dashboard/show.ejs')
}

const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers()
    res.render('admin/user/show.ejs', {users: users})
}

const getAdminOrderPage = (req: Request, res: Response) => {
    res.render('admin/order/show.ejs')
}

const getAdminProductPage = (req: Request, res: Response) => {
    res.render('admin/product/show.ejs')
}

const getCreateUserPage = async (req: Request, res: Response) => {
   res.render("admin/user/create.ejs")
}

export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage, getCreateUserPage }