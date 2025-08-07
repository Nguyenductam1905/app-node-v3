import { Request, Response } from "express"
import { getProductList } from "services/admin/product.service"
import { getAllRoles, getAllUsers } from "services/user.services"


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

const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getProductList()
    res.render('admin/product/show.ejs', {products})
}

const getCreateUserPage = async (req: Request, res: Response) => {
   const roles = await getAllRoles()
   res.render("admin/user/create.ejs", {roles})
}

export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage, getCreateUserPage }