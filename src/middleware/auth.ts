import { NextFunction, Request, Response } from "express"

const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthenticated = req.isAuthenticated();
    if(isAuthenticated){
        res.redirect("/")
    }
    else{
        next()
    }
}

export {
    isLogin
}