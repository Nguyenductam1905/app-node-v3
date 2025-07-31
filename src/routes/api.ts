import { postAddProductToCart } from "controllers/admin/product.controller";
import { createUserAPI, deleteUserByIdAPI, getAllUserAPI, getAllUserAPIByID, loginAPI, updateUserByIdAPI } from "controllers/client/api.controller";
import express, {Express} from 'express'
import checkValidJWT from "src/middleware/jwt.middleware";

const router = express.Router();

const apiRoutes = (app: Express) => {
    router.post("/add-product-to-cart", postAddProductToCart);

    router.get("/users", checkValidJWT, getAllUserAPI)

    router.get("/users/:id", getAllUserAPIByID)

    router.post("/users", createUserAPI)

    router.patch("/users/:id", updateUserByIdAPI)

    router.delete("/users/:id", deleteUserByIdAPI)

    router.post("/login", loginAPI)


    app.use("/api", router);


}

export default apiRoutes