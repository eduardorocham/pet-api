import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/Especie";
import AdotanteEntity from "./Adotante";
import EnumPorte from "../enum/Porte";
import AbrigoEntity from "./Abrigo";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome: string;
    @Column()
    especie: EnumEspecie;
    @Column({ nullable: true })
    porte?: EnumPorte;
    @Column()
    dataDeNascimento: Date;
    @Column()
    adotado: boolean

    // muitos pets podem estar associados a um único adotante
    // um adotante pode adotar vários pets, mas cada pet é adotado por um único adotante.
    @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
    adotante!: AdotanteEntity;

    @ManyToOne(() => AbrigoEntity, (abrigo) => abrigo.pets)
    abrigo!: AbrigoEntity;

    constructor(
        nome: string,
        especie: EnumEspecie,
        dataDeNascimento: Date,
        adotado: boolean,
        porte?: EnumPorte
    ) {
        this.nome = nome;
        this.especie = especie;
        this.porte = porte;
        this.dataDeNascimento = dataDeNascimento;
        this.adotado = adotado;
    }
}