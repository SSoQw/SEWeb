import type { Request, Response, NextFunction} from "express"

export const userIsValid = (req: Request, res: Response, next: NextFunction) => {
    if(req.user)
        return next();
    else
        res.redirect("/login");
}

export const userAlreadyLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if(req.user)
        res.status(200).redirect("/dashboard");
    else
        next();
}