import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "src/validation/user.schema";

const getAdminCreateProduct = (req: Request, res: Response) => {
    return res.render("admin/product/create.ejs")
}

const postAdminCreateProduct = (req: Request, res: Response) => {
    const {name} = req.body as TProductSchema
    try {
        const result = ProductSchema.parse(req.body)
        console.log("run ok", result);
    } catch (error) {
        // console.log(error)
    }
    res.redirect("/admin/product")
}

export {getAdminCreateProduct, postAdminCreateProduct}