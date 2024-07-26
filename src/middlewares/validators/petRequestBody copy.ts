import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../../types/Pet";
import * as yup from "yup";
import { pt } from "yup-locale-pt"
import EnumEspecie from "../../enum/Especie";
import EnumPorte from "../../enum/Porte";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const schemaBodyPet: yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante"|"abrigo">> = yup.object({
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
    tratarErroValidacaoYup(schemaBodyPet, req, res, next);
}