import { Request, Response } from "express";

const getProductPage = (req: Request, res: Response) => {
    return res.render("client/product/detail.ejs")
}

export {getProductPage}