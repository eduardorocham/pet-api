import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/Porte";

export default interface PetInterface {
    criaPet(pet: PetEntity): void;
    listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity): void;
    deletaPet(id: number, pet: PetEntity): void

    buscaPetPeloPorte(porte: EnumPorte) : Promise<PetEntity[]> | PetEntity[];

    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
        campo: Tipo, 
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]> | PetEntity[]
}