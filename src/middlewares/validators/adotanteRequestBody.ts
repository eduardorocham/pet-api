import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante } from "../../types/Adotante";
import * as yup from "yup";

const schemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined().required(),
  senha: yup.string().defined().required().min(6),
  foto: yup.string().optional(),
})

export const middlewareValidatorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schemaBodyAdotante.validate(req.body, {
            abortEarly: false,
        });
        return next();
    } catch(error) {
        const yupErrors = error as yup.ValidationError;

        const validationErrors : Record<string, string> = {};
        yupErrors.inner.forEach((error) => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        })
        return res.status(400).json({ error: validationErrors });
    }
}