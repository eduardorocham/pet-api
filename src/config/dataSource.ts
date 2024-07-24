import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";
import AdotanteEntity from "../entities/Adotante";
import EnderecoEntity from "../entities/Endereco";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [PetEntity, AdotanteEntity, EnderecoEntity],
    synchronize: true,
})