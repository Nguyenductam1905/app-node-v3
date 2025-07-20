import { Request, Response } from "express"
import { handleDeleteProduct, handleViewProduct } from "services/admin/product.service"
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
   const user = req.body;
   const userId = req.params.id;
   const { name, email, address, phone, role, avatar } = user
   await handleUpdateUser(+userId, name, email, address, phone, +role, avatar)
   res.redirect("/admin/user")
}

const getProductPage = (req: Request, res: Response) =>{
   return res.render("client/product/detail.ejs")
}

const postAdminDeleteProduct = async (req: Request, res: Response) => {
   const productId = req.params.id;
   await handleDeleteProduct(+productId)
   return res.redirect("/admin/product")
}

const getAdminViewProduct = async (req: Request, res: Response) => {
   const factoryOptions = [
      {name: "Aplle (Macbook)", value: "APPLE"},
      {name: "Asus", value: "ASUS"},
      {name: "Lenovo", value: "LENOVO"},
      {name: "Dell", value: "DELL"},
      {name: "LG", value: "LG"},
      {name: "Acer", value: "ACER"},
   ]
   const targetOptions = [
      {name: "Gaming", value: "GAMING"},
      {name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG"},
      {name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA"},
      {name: "Mỏng nhẹ", value: "MONG-NHE"},
      {name: "Doanh nhân", value: "DOANH-NHAN"},
   ]
   const productId = req.params.id;
   const productInfo = await handleViewProduct(+productId)
   return res.render("admin/product/detail.ejs", {product: productInfo, factoryOptions, targetOptions})
}




export { getHomePage, postCreateUser, postDeleteUser, getViewUserById, postUpdateUser, getProductPage, postAdminDeleteProduct, getAdminViewProduct }