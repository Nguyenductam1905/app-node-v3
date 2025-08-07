import { NextFunction, Request, Response } from "express"

const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
        return res.redirect("/")
    }
    else {
        next()
    }
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/admin")) {
        const user = req.user 
        if (user?.role?.name === "ADMIN") {
            next();
        } else {
            res.render("status/403.ejs")
        }
        return;
    }

}

export {
    isLogin,
    isAdmin
}