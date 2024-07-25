import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../../types/Pet";
import * as yup from "yup";
import { pt } from "yup-locale-pt"
import EnumEspecie from "../../enum/Especie";
import EnumPorte from "../../enum/Porte";

yup.setLocale(pt);

const schemaBodyPet: yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante">> = yup.object({
  nome: yup.string().defined().required(),
  especie: yup.string().oneOf(Object.values(EnumEspecie)).defined().required(),
  porte: yup.string().oneOf(Object.values(EnumPorte)).defined().required(),
  dataDeNascimento: yup.date().defined().required(),
  adotado: yup.boolean().defined().required(),
})

export const middlewareValidatorBodyPet = async (
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>,
    next: NextFunction
) => {
    try {
        await schemaBodyPet.validate(req.body, {
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