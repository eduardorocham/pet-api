import AdotanteEntity from "../entities/Adotante";

export type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;
export type TipoRequestParamsAdotante = { id?: string };
export type TipoResponseBodyAdotante = {
    data?: 
        Pick<AdotanteEntity, "id" |"nome"|"celular"|"endereco"> |
        Pick<AdotanteEntity, "id" |"nome"|"celular"|"endereco">[];
    error?: unknown
};