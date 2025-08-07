import { postAddProductToCart } from "controllers/admin/product.controller";
import { createUserAPI, deleteUserByIdAPI, fetchAccountAPI, getAllUserAPI, getAllUserAPIByID, loginAPI, updateUserByIdAPI } from "controllers/client/api.controller";
import express, {Express} from 'express'
import checkValidJWT from "src/middleware/jwt.middleware";

const router = express.Router();

const apiRoutes = (app: Express) => {
    router.post("/add-product-to-cart", postAddProductToCart);

    router.get("/users", getAllUserAPI)

    router.get("/users/:id", getAllUserAPIByID)

    router.post("/users", createUserAPI)

    router.patch("/users/:id", updateUserByIdAPI)

    router.delete("/users/:id", deleteUserByIdAPI)

    router.post("/login", loginAPI)

    router.get("/account", fetchAccountAPI)


    app.use("/api", checkValidJWT, router);


}

export default apiRoutes