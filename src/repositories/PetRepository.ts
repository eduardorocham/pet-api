import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import PetInterface from "./interfaces/PetInterface";
import AdotanteEntity from "../entities/Adotante";
import EnumPorte from "../enum/Porte";
import { NaoEncontrado } from "../utils/manipulaErros";

export default class PetRepository implements PetInterface {
    private petRepository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>;

    constructor(
        petRepository: Repository<PetEntity>, 
        adotanteRepository: Repository<AdotanteEntity>
    ) {
        this.petRepository = petRepository;
        this.adotanteRepository = adotanteRepository;
    }

    criaPet(pet: PetEntity): void {
        this.petRepository.save(pet);
    }
    
    async listaPet(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }

    atualizaPet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }
    
    async deletaPet(id: number, pet: PetEntity) {
        const petToRemove = await this.petRepository.findOne({ where: { id } });

        if (!petToRemove) {
            throw new NaoEncontrado("Pet não encontrado");
        }

        await this.petRepository.remove(petToRemove);

        return { sucess: true };
    }

    async adotaPet(
        idPet: number, 
        idAdotante: number
      ): Promise<{ success: boolean; message?: string; }> {
        const pet = await this.petRepository.findOne({ where: { id: idPet } });
  
        if (!pet) {
          throw new NaoEncontrado("Pet não encontrado")
        }
  
        const adotante = await this.adotanteRepository.findOne({
            where: { id: idAdotante },
        });
        if (!adotante) {
            throw new NaoEncontrado("Adotante não encontrado")
        }
        pet.adotante = adotante;
        pet.adotado = true;
        await this.petRepository.save(pet);
        return { success: true };
    }

    async buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: { porte } });
        return pets;
    }

    async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
        campo: Tipo, 
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: { [campo]:valor } });
        return pets;
    }
}