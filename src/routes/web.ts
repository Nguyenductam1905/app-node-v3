import express from "express";
import { getHomePage, postCreateUser, postDeleteUser, getViewUserById, postUpdateUser, getProductPage, postAdminDeleteProduct, getAdminViewProduct } from "controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getCreateUserPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getAdminCreateProduct, postAdminCreateProduct } from "controllers/admin/product.controller";

const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

export const webRoutes = (app: express.Application) => {

    router.get("/", getHomePage)

    //client routes
    router.get("/product/:id", getProductPage)

    //admin routes
    router.post("/admin/delete-user/:id", postDeleteUser)

    router.get("/admin/view-user/:id", getViewUserById)

    router.post("/admin/update-user/:id", fileUploadMiddleware("avatar"), postUpdateUser)

    router.get("/admin", getDashboardPage)

    router.get("/admin/user", getAdminUserPage)

    router.get("/admin/product", getAdminProductPage)

    router.get("/admin/order", getAdminOrderPage)

    router.get("/admin/create-user", getCreateUserPage)

    router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser)

    router.get("/admin/user/create", getCreateUserPage)

    router.get("/admin/create-product", fileUploadMiddleware("image", "images/product"), getAdminCreateProduct)

    router.post("/admin/handle-create-product", fileUploadMiddleware("image", "images/product"), postAdminCreateProduct)

    router.post("/admin/delete-product/:id", postAdminDeleteProduct)

    router.get("/admin/view-product/:id", getAdminViewProduct)

    app.use("/", router)

}
