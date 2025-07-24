import express from "express";
import { getHomePage, postCreateUser, postDeleteUser, getViewUserById, postUpdateUser, getProductPage, postAdminDeleteProduct, getAdminViewProduct } from "controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getCreateUserPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getAdminCreateProduct, postAdminCreateProduct, postUpdateProduct } from "controllers/admin/product.controller";
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postRegister } from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";

const router = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

export const webRoutes = (app: express.Application) => {

    router.get("/", getHomePage)

    //client routes
    router.get("/product/:id", getProductPage)

    router.get("/register", getRegisterPage)

    router.get("/login", isLogin ,getLoginPage)

    router.post("/register", postRegister)

    router.get("/success-redirect", getSuccessRedirectPage)

    router.post("/login", passport.authenticate('local', { 
        successRedirect: "/success-redirect", 
        failureRedirect: '/login',
        failureMessage: true
    }))

    //admin routes
    router.get("/admin", isAdmin ,getDashboardPage)


    router.post("/admin/delete-user/:id", postDeleteUser)

    router.get("/admin/view-user/:id", fileUploadMiddleware("avatar"), getViewUserById)

    router.post("/admin/update-user/:id", fileUploadMiddleware("avatar"), postUpdateUser)

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

    router.post("/admin/update-product/:id", fileUploadMiddleware("image", "images/product"), postUpdateProduct)

    app.use("/", router)

}
