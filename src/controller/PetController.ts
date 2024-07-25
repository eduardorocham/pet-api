import { Request, Response } from "express";
import EnumEspecie from "../enum/Especie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/Porte";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../types/Pet";
export default class PetController {
    constructor(private repository: PetRepository) {}

    async criaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const { adotado, especie, dataDeNascimento, nome, porte } = <PetEntity>req.body;

        try {
            if (!Object.values(EnumEspecie).includes(especie)) {
                return res.status(400).json({ error: "Espécie inválida" });
            }
            if (porte && !(porte in EnumPorte)) {
                return res.status(400).json({ error: "Porte inválido!" });
            }
    
            const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);
            await this.repository.criaPet(novoPet);
    
            return res.status(201).json({ data: { id: novoPet.id, nome, especie, porte } });
        } catch(err) {
            res.status(500).json({ error: err })
        }
    }

    async listaPets (
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        try {
            const pets = await this.repository.listaPet();
            const data = pets.map((pet) => {
                return {
                    id: pet.id,
                    nome: pet.nome,
                    porte: pet.porte,
                    especie: pet.especie
                }
            })
            return res.status(200).json({ data });
        } catch(err) {
            return res.status(500).json({ error: err })
        }
    }
        
    // async atualizaPet (
    //     req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    //     res: Response<TipoResponseBodyPet>
    // ) {
    //     const { id } = req.params;
    //     const { success, message } = await this.repository.atualizaPet(
    //         Number(id),
    //         req.body as PetEntity
    //     );
        
    //     if (!success) {
    //         return res.status(404).json({ error: message });
    //     }

    //     return res.status(404).json({ data: message }) 
    // }

    // async deletaPet (
    //     req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    //     res: Response<TipoResponseBodyPet>
    // ) {
    //     const { id } = req.params;
    //     const { success, message } = await this.repository.atualizaPet(
    //         Number(id),
    //         req.body as PetEntity
    //     );
        
    //     if (!success) {
    //         return res.status(404).json({ error: message });
    //     }

    //     return res.status(404).json({ data: message }) 
    // }    

    async adotaPet(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const { pet_id, adotante_id } = req.params;
    
        const { success, message } = await this.repository.adotaPet(
          Number(pet_id), 
          Number(adotante_id)
        );
    
        if (!success) {
          return res.status(404).json({ error: message });
        }
        return res.sendStatus(204);
    }

    async buscaPetPeloPorte(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const { porte } = req.query;
        const listaDePets = await this.repository.buscaPetPeloPorte(porte as EnumPorte);
        return res.status(200).json({ data: listaDePets});
    }

    async buscaPetPorCampoGenerico(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const { campo, valor } = req.query;
        const listaDePets = await this.repository.buscaPetPorCampoGenerico(
            campo as keyof PetEntity,
            valor as string
        );
        return res.status(200).json({ data: listaDePets});
    }
}