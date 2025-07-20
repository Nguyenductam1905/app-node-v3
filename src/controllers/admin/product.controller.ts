import { error } from "console";
import { Request, Response } from "express";
import { createProduct } from "services/admin/product.service";
import { ProductSchema, TProductSchema } from "src/validation/user.schema";
import { string } from "zod";

const getAdminCreateProduct = (req: Request, res: Response) => {
    const errors:any = []
    const oldData = {
        name:"",
        price: "",
        detailDesc: "",
        shortDesc: "",
        factory: "",
        target:""
    }
    return res.render("admin/product/create.ejs",{errors, oldData})
}

const postAdminCreateProduct = async (req: Request, res: Response) => {
    const {name, price, detailDesc, shortDesc, factory, quantity, target} = req.body as TProductSchema

    const validate = ProductSchema.safeParse(req.body)
    if(!validate.success){
        //error
        const errorsZod = validate.error.issues;
        const errors = errorsZod.map((item: any)=>`${item.message} (${item.path[0]})`)
        const oldData = {
        name:"",
        price: "",
        detailDesc: "",
        shortDesc: "",
        factory: "",
        quantity:"",
        target:""
    }
    return res.render("admin/product/create.ejs", {errors, oldData})
    }
    const errors: any = []
    const image = req.file?.filename

    //success
    await createProduct(name, price, detailDesc, shortDesc, factory, quantity, target, image || "")
    return res.redirect("/admin/product")

}



export {getAdminCreateProduct, postAdminCreateProduct}