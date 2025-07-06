import express from "express";
import { getHomePage, postCreateUser, postDeleteUser, getViewUserById, postUpdateUser } from "controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getCreateUserPage} from "controllers/admin/dashboard.controller";

const router = express.Router()

export const webRoutes = (app: express.Application) => {

    router.get("/", getHomePage)

    router.get("/create-user", getCreateUserPage)

    router.post("/handle-create-user", postCreateUser)

    router.post("/handle-delete-user/:id", postDeleteUser)

    router.get("/view-user/:id", getViewUserById)

    router.post("/handle-update-user/:id", postUpdateUser)

    router.get("/admin", getDashboardPage)

    router.get("/admin/user", getAdminUserPage)

    router.get("/admin/product", getAdminProductPage)

    router.get("/admin/order", getAdminOrderPage)

    router.get("/admin/user/create", getCreateUserPage)

    app.use("/", router)

}
