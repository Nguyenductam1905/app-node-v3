import { Request, Response } from "express";
import { createProduct, handleUpdateProduct, handleViewProduct } from "services/admin/product.service";
import { addProductToCart, getCartUserInfoById, getProductByUserCart } from "services/client/item.service";
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

const postUpdateProduct = async (req: Request, res: Response) => {
    const productId: number = +req.params.id;
    const {
        name, 
        price, 
        detailDesc, 
        shortDesc,
        factory, 
        quantity, 
        target
    } = req.body as TProductSchema
    const productImage = req.file?.filename
    // console.log(req.body)
    await handleUpdateProduct(
        productId, 
        name, 
        price, 
        detailDesc, 
        shortDesc,
        factory, 
        quantity, 
        target, 
        productImage || ""
    )
    res.redirect("/admin/product")
}

const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = req.user;

    if (!user) {
        return res.redirect("/login");
    }

    await addProductToCart(1, +id, user);

    return res.redirect("/");
}

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user as any;
    if(!user) return res.redirect("/login")
    //after query cart, get product detail from  userCart
    const products = await getProductByUserCart(user.cartDetail)
    const prices = (products.map(product => product.price,[]))
    let total_price = 0
    for(let i = 0; i < prices.length; i++){
        total_price += (prices[i] * user.cartDetail[i].quantity)
    }

    return res.render("client/product/cart.ejs", {user, products, total_price})
}

export {getAdminCreateProduct, postAdminCreateProduct, postUpdateProduct, postAddProductToCart, getCartPage}