import { error } from "console";
import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "src/validation/user.schema";

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

const postAdminCreateProduct = (req: Request, res: Response) => {
    const {name} = req.body as TProductSchema

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
        target:""
    }
    return res.render("admin/product/create.ejs", {errors, oldData})
        
    }
    //success
    return res.render("admin/product/create.ejs")

}

export {getAdminCreateProduct, postAdminCreateProduct}