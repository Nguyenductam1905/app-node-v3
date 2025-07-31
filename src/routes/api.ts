import { postAddProductToCart } from "controllers/admin/product.controller";
import { createUserAPI, deleteUserByIdAPI, getAllUserAPI, getAllUserAPIByID, updateUserByIdAPI } from "controllers/client/api.controller";
import express, {Express} from 'express'

const router = express.Router();

const apiRoutes = (app: Express) => {
    router.post("/add-product-to-cart", postAddProductToCart);

    router.get("/users", getAllUserAPI)

    router.get("/users/:id", getAllUserAPIByID)

    router.post("/users", createUserAPI)

    router.patch("/users/:id", updateUserByIdAPI)

    router.delete("/users/:id", deleteUserByIdAPI)

    app.use("/api", router);


}

export default apiRoutes