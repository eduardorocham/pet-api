import AbrigoEntity from "../../entities/Abrigo"; 
import EnderecoEntity from "../../entities/Endereco";

export default interface AbrigoInterface {
    criaAbrigo(pet: AbrigoEntity): void | Promise<void>;
    listaAbrigos(): Array<AbrigoEntity> | Promise<AbrigoEntity[]>;
    atualizaAbrigo(id: number, pet: AbrigoEntity): void;
    deletaAbrigo(id: number, pet: AbrigoEntity): void;
    atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity): void;
}