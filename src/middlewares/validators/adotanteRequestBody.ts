import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante, TipoRequestParamsAdotante, TipoResponseBodyAdotante } from "../../types/Adotante";
import * as yup from "yup";
import { pt } from "yup-locale-pt"

yup.setLocale(pt);

const schemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup
    .string()
    .defined()
    .required()
    .matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "celular inválido"),
  senha: yup
    .string()
    .defined()
    .required()
    .min(6)
    .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
        "senha inválida"
    ),
  foto: yup.string().optional(),
})

export const middlewareValidatorBodyAdotante = async (
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, 
    res: Response<TipoResponseBodyAdotante>,
    next: NextFunction
) => {
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
        return res.status(400).json({ erros: validationErrors });
    }
}