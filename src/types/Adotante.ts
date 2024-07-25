import AdotanteEntity from "../entities/Adotante";

export type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">;
export type TipoRequestParamsAdotante = { id?: string };
export type TipoResponseBodyAdotante = {
    data?: 
        Pick<AdotanteEntity, "id" |"nome"|"celular"> |
        Pick<AdotanteEntity, "id" |"nome"|"celular">[];
    error?: string
};