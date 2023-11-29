import type { Request, Response, NextFunction} from "express"

export const userIsValid = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies, req.user)
    if(req.user)
        return next();
    else
        res.redirect("/");
}