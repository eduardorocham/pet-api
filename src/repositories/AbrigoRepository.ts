import { Repository } from "typeorm";
import AbrigoEntity from "../entities/Abrigo";
import AbrigoInterface from "./interfaces/AbrigoInterface";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";
import EnderecoEntity from "../entities/Endereco";

export default class AbrigoRepository implements AbrigoInterface {
    private abrigoRepository: Repository<AbrigoEntity>;

    constructor(
        abrigoRepository: Repository<AbrigoEntity>
    ) {
        this.abrigoRepository = abrigoRepository;
    }

    private async verificaEmailAbrigo(email: string) {
        return await this.abrigoRepository.findOne({
          where: {
            email
          }
        })
    }

    private async verificaCelularAbrigo(celular: string) {
        return await this.abrigoRepository.findOne({
          where: {
            celular
          }
        })
    }

    async criaAbrigo(abrigo: AbrigoEntity) {
        if (await this.verificaEmailAbrigo(abrigo.email)) {
            throw new RequisicaoRuim("E-mail já cadastrado")
        }

        if (await this.verificaCelularAbrigo(abrigo.celular)) {
            throw new RequisicaoRuim("Celular já cadastrado")
        }

        this.abrigoRepository.save(abrigo);
    }
    
    async listaAbrigos(): Promise<AbrigoEntity[]> {
        return await this.abrigoRepository.find();
    }

    async atualizaAbrigo(id: number, newData: AbrigoEntity) {
        const abrigoToUpdate = await this.abrigoRepository.findOne({ where: { id } });
    
        if (!abrigoToUpdate) {
            throw new NaoEncontrado("Abrigo não encontrado")
        }

        // Copia os dados do objeto newData
        Object.assign(abrigoToUpdate, newData);

        await this.abrigoRepository.save(abrigoToUpdate);

        return { success: true };
    }
    
    async deletaAbrigo(id: number) {
        const abrigoToRemove = await this.abrigoRepository.findOne({ where: { id } });

        if (!abrigoToRemove) {
            throw new NaoEncontrado("Abrigo não encontrado");
        }

        await this.abrigoRepository.remove(abrigoToRemove);

        return { sucess: true };
    }

    async buscaAbrigoPorCampoGenerico<Tipo extends keyof AbrigoEntity>(
        campo: Tipo, 
        valor: AbrigoEntity[Tipo]
    ): Promise<AbrigoEntity[]> {
        const abrigos = await this.abrigoRepository.find({ where: { [campo]:valor } });
        return abrigos;
    }

    async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
        const abrigo = await this.abrigoRepository.findOne({
            where: { id: idAbrigo },
        });
      
        if (!abrigo) {
            new NaoEncontrado("Abrigo não encontrado!");
        }
      
        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);

        if (abrigo) {
            abrigo.endereco = novoEndereco;
            await this.abrigoRepository.save(abrigo);
        }
    }
}