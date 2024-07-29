# API de Adoção de Pets

Este projeto é uma API de adoção de pets, desenvolvida durante um curso da Alura. A API foi construída com Express e TypeScript, utilizando TypeORM para a comunicação com o banco de dados SQLite. Para validações, utilizamos o Yup.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **TypeORM**
- **SQLite**
- **Yup**

## Entidades

### Pet

Representa um pet disponível para adoção.

- **id**: Identificador único do pet (UUID)
- **nome**: Nome do pet
- **especie**: Tipo do pet (cachorro, gato, etc.)
- **porte**: Porte do pet (pequeno, medio, grande)
- **adotado**: Identificador se o pet foi adotado
- **dataDeNascimento**: Data de nascimento do pet
- **adotanteId**: Identicador do adotante (caso haja)
- **abrigoId**: Identicador do abrigo

### Abrigo

Representa um abrigo de pets.

- **id**: Identificador único do abrigo (UUID)
- **nome**: Nome do abrigo
- **enderecoId**: Identificador do endereço do abrigo

### Adotante

Representa um adotante que deseja adotar um pet.

- **id**: Identificador único do adotante (UUID)
- **nome**: Nome do adotante
- **email**: Email do adotante
- **senha**: Senha do adotante
- **celular**: Telefone do adotante
- **enderecoId**: Identificador do endereço do adotante
- **foto**: Foto do adotante

### Endereço

Representa um endereço, utilizado tanto por abrigos quanto por adotantes.

- **id**: Identificador único do endereço (UUID)
<!-- - **rua**: Nome da rua -->
- **cidade**: Nome da cidade
- **estado**: Nome do estado
<!-- - **cep**: Código postal (CEP) -->

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/eduardorocham/pet-api.git
```

2. Instale as dependências::

```bash
npm install
```

3. Configure o banco de dados SQLite no arquivo /src/config/dataSource.ts (caso necessário):

4. Inicie o servidor:

```bash
npm start
```

A API estará disponível em http://localhost:3000.

## Endpoints

### Pets

- **GET /pets**: Lista todos os pets.
- **GET /pets/filtro**: Filtra os pets com de acordo com a chave e valor na query
<!-- - **GET /pets/:id**: Obtém um pet específico. -->
- **POST /pets**: Cria um novo pet.
- **PUT /pets/:id**: Atualiza um pet existente.
- **PUT /pets/:id/:adotante_id**: Associa um pet a um adotante
- **DELETE /pets/:id**: Remove um pet.

### Abrigos

- **GET /abrigos**: Lista todos os abrigos.
<!-- - **GET /abrigos/:id**: Obtém um abrigo específico. -->
- **POST /abrigos**: Cria um novo abrigo.
- **PUT /abrigos/:id**: Atualiza um abrigo existente.
- **PATCH /abrigos/:id**: Atualiza o endereço de um abrigo.
- **DELETE /abrigos/:id**: Remove um abrigo.

### Adotantes

- **GET /adotantes**: Lista todos os adotantes.
<!-- - **GET /adotantes/:id**: Obtém um adotante específico. -->
- **POST /adotantes**: Cria um novo adotante.
- **PUT /adotantes/:id**: Atualiza um adotante existente.
- **PATCH /abrigos/:id**: Atualiza o endereço de um adotante.
- **DELETE /adotantes/:id**: Remove um adotante.

<!-- ### Endereços

- **GET /enderecos**: Lista todos os endereços.
- **GET /enderecos/:id**: Obtém um endereço específico.
- **POST /enderecos**: Cria um novo endereço.
- **PUT /enderecos/:id**: Atualiza um endereço existente.
- **DELETE /enderecos/:id**: Remove um endereço. -->
