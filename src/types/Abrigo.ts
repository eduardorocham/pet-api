import AbrigoEntity from "../entities/Abrigo";

export type TipoRequestBodyAbrigo = Omit<AbrigoEntity, "id"|"pets">;
export type TipoRequestParamsAbrigo = { id?: string };
export type TipoResponseBodyAbrigo = {
    dados?: 
        Pick<AbrigoEntity, "id" |"nome"|"celular"|"endereco"|"email"> |
        Pick<AbrigoEntity, "id" |"nome"|"celular"|"endereco"|"email">[];
};
