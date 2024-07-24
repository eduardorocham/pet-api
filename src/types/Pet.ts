import EnumEspecie from "../enum/Especie";

type Pet = {
    id: number,
    nome: string,
    especie: EnumEspecie,
    adotado: boolean,
    dataDeNascimento: Date
}

export default Pet;