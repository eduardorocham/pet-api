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

        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);
        await this.repository.criaPet(novoPet);

        return res.status(201).json({ dados: { id: novoPet.id, nome, especie, porte } });
    }

    async listaPets (
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const pets = await this.repository.listaPet();
        const data = pets.map((pet) => {
            return {
                id: pet.id,
                nome: pet.nome,
                porte: pet.porte !== null ? pet.porte : undefined,
                especie: pet.especie
            }
        })
        return res.status(200).json({ dados: data });
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
    
        await this.repository.adotaPet(
          Number(pet_id), 
          Number(adotante_id)
        );

        return res.sendStatus(204);
    }

    async buscaPetPeloPorte(
        req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
        res: Response<TipoResponseBodyPet>
    ) {
        const { porte } = req.query;
        const listaDePets = await this.repository.buscaPetPeloPorte(porte as EnumPorte);
        return res.status(200).json({ dados: listaDePets});
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
        return res.status(200).json({ dados: listaDePets});
    }
}