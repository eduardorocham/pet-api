import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../../types/Abrigo";
import * as yup from "yup";
import { pt } from "yup-locale-pt"
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const schemaBodyAbrigo: yup.ObjectSchema<TipoRequestBodyAbrigo> = yup.object({
  nome: yup.string().defined().required(),
  email: yup
    .string()
    .defined()
    .required()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm, "e-mail inválido"),
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
})

export const middlewareValidatorBodyAbrigo = async (
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, 
    res: Response<TipoResponseBodyAbrigo>,
    next: NextFunction
) => {
    tratarErroValidacaoYup(schemaBodyAbrigo, req, res, next);
}