import { 
    Column, 
    Entity, 
    JoinColumn, 
    PrimaryGeneratedColumn, 
    BeforeInsert, 
    BeforeUpdate, 
    OneToOne,
    OneToMany
} from "typeorm";
import EnderecoEntity from "./Endereco";
import PetEntity from "./PetEntity";
import { criaSenhaCriptografada } from "../utils/senhaCriptografada";

@Entity()
export default class AbrigoEntity {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    nome: string;
    @Column({ unique: true })
    email: string;
    @Column()
    senha: string;
    @Column({ unique: true })
    celular: string;

    @OneToOne(() => EnderecoEntity, {
        nullable: true,
        cascade: true,
        eager: true
    })
    @JoinColumn()
    endereco?: EnderecoEntity;

    @OneToMany(() => PetEntity, (pet) => pet.adotante)
    pets!: PetEntity[]

    constructor(
        nome: string,
        email: string,
        senha: string,
        celular: string,
        endereco?: EnderecoEntity,
        pets?: PetEntity[]
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.celular = celular;
        this.endereco = endereco;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async criptografaSenha(senha: string) {
      this.senha = criaSenhaCriptografada(this.senha);
    }
}