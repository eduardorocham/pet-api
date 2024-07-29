import { Request, Response } from "express";
import AbrigoEntity from "../entities/Abrigo";
import AbrigoRepository from "../repositories/AbrigoRepository";
import EnderecoEntity from "../entities/Endereco";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../types/Abrigo"; 
export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}

  async criaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, 
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { nome, celular, email, senha, endereco } = <AbrigoEntity>req.body;

    const novoAbrigo = new AbrigoEntity(
      nome,
      email,
      senha,
      celular,
      endereco
    );

    await this.repository.criaAbrigo(novoAbrigo);
    return res.status(201).json({ dados: { id: novoAbrigo.id, nome, email, celular, endereco } });
  }

  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, 
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.atualizaAbrigo(
      Number(id),
      req.body as AbrigoEntity
    );

    return res.sendStatus(204);
  }
    
  async listaAbrigos(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, 
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const listaDeAbrigos = await this.repository.listaAbrigos();
    const dados = listaDeAbrigos.map((abrigo) => {
      return {
        id: abrigo.id,
        nome: abrigo.nome,
        email: abrigo.email,
        celular: abrigo.celular,
        endereco: abrigo.endereco !== null ? abrigo.endereco : undefined,
      }
    })
    return res.status(200).json({ dados });
  }
    
  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, 
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;

    await this.repository.deletaAbrigo(
      Number(id)
    );

    return res.sendStatus(204);
  }

  async atualizaEnderecoAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>, 
    res: Response<TipoResponseBodyAbrigo>) {
    const { id } = req.params;

    await this.repository.atualizaEnderecoAbrigo(
      Number(id), 
      req.body
    );

    return res.sendStatus(204);
  }
}