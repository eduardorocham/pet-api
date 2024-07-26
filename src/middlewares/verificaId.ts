import { NextFunction, Response, Request } from "express";
import { RequisicaoRuim } from "../utils/manipulaErros";

export const verificaIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const params = { ...req.params };

    for(const param in params) {
        if (!Number.isInteger(Number(params[param]))) {
            throw new RequisicaoRuim(`O parâmetro ${param} deve ser um número inteiro`);
        }
    }

    next();
}