import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] ?? ""
    console.log(token)
    try{
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const dataDecoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = {
            id: dataDecoded.id,
            username: dataDecoded.username,
            password: dataDecoded.password,
            fullName: dataDecoded.name,
            address: dataDecoded.address,
            phone: dataDecoded.phone,
            cardId: dataDecoded.cardId ?? "",
            cartDetail: dataDecoded.cartDetail ?? null,
            accountType: dataDecoded.accountType ?? "",
            avatar: dataDecoded.avatar ?? "",
            roleId: dataDecoded.role ?? ""
        }
        console.log(req.user)
        
        next()
    }
    catch (error){
        res.status(401).json({
            data: null,
            message: "Invalid Token"
        })
    }
}

export default checkValidJWT