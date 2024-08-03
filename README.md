<h1 align="center">
  Laborit Text2Sql
</h1>

<p align="center">Esta aplicação transforma linguagem natural em sql pronto para uso se baseando em um esquema de banco de dados conhecido.</p>

<div align="center" dir="auto">

 ![Test](https://img.shields.io/static/v1?style=flat-square&logo=vitest&logoColor=white&label=Tested%20Vitest&message=0.34.4&color=6E9610) ![Package Manager](https://img.shields.io/static/v1?style=flat-square&logo=npm&logoColor=white&label=Npm&message=1.22.19&color=C11B1A)

</div>

<h1 align="center"> Getting Started</h1> 

<p align="center">O Software foi desenvolvido com a intenção de trazer agilidade e automoção para a empresa FintechX na coleta de dados e indicadores da sua base de dados para tomadas de decisões acertivas.</P>

<p align="center">
.</p>



## Setup application

- NodeJs 18:00 ou superior ✅;
- TypeScript ✅;
- Prisma ✅;
- Mysql como banco de dados de produção e de teste✅;
- Docker para testagem e2e ✅;

#### Tech Stack

![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-11394E?style=for-the-badge&logo=prisma&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-70961E?style=for-the-badge&logo=vitest&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-813F90?style=for-the-badge&logo=axios&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-264B7E?style=for-the-badge&logo=zod&logoColor=white) ![Mysql](https://img.shields.io/badge/MySql-F7A017?style=for-the-badge&logo=mysql&logoColor=00516A) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) 



## Como funciona

#### Clone o repositório

```
https://github.com/NailsonCodens/FintechX-TextToSql-Laborit.git
```

#### Instale as dependencias

```
npm install
```

#### Faça uma cópia do .env.example ae renomei a copia para .env

```
sudo cp .env.example .env
```

#### Adicione os valores das variaveis necessárias
Você receberá os dados de producão em seu e-mail. Qualquer coisa, mande um e-mail para nailson.ivs@gmail.com e solicite as informações de produção.
```
#enviroment
KEY_IA=
MODEL=
DB_DATABASE=
DATABASE_URL=
DB_DATABASE_TEST=
DATABASE_URL_TEST=
```

#### Rodando comandos necessários para funcionar em localhost

```
npx prisma generate 

```

#### Funcionalidades

[-] Criar sql a partir de linguagem natural

#### Rodando testes unitários

```
npm run test
```

#### Run teste 2e2
Para simular uma situação mais próxima do real nos testes unitários, é necessário iniciar uma container docker

```
docker compose up
npx prisma migrate deploy
npm run teste:e2e
```

#### Arquivo Json para Insomnia e Postman para testar os end points da aplicação

```

```

That is it! 

<p align="center">Todos os direitos reservados a Laborit</p>