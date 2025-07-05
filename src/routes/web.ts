import express from "express";
import { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUserById, postUpdateUser } from "controllers/user.controller";

const router = express.Router()

export const webRoutes = (app: express.Application) => {

    router.get("/", getHomePage)

    router.get("/create-user", getCreateUserPage)

    router.post("/handle-create-user", postCreateUser)

    router.post("/handle-delete-user/:id", postDeleteUser)

    router.get("/view-user/:id", getViewUserById)

    router.post("/handle-update-user/:id", postUpdateUser)

    app.use("/", router)

}
