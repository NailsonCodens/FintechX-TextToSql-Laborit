import OpenAI from "openai";
import { generateResponseSqlProps, IIaProvider } from "../i-ia";

class OpenIaProvider implements IIaProvider{
  private openAi: OpenAI;

  constructor() {
    this.openAi = new OpenAI({
      apiKey: process.env.KEY_IA,
    });
  }

  async generateResponseSql({schemaContext, request}: generateResponseSqlProps){

    const teste = JSON.stringify(schemaContext);
    const prompt = `${teste} este é o schema do meu banco de dados, baseado nisto responda transformando a linguagem na atual em sql. A pergunta é: ${request}`;

    const responseIA = await this.openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            `Você é uma assistente virtual que transforma a linguagem natural da pergunta do usuário em um SQL baseado no schema de banco de dados passado seja suscinta. Não precisa formatar o texto e nem inserir espaços e nem quebrar linhas.`,
        },
        {
          role: "user",
          content: prompt
        },
      ],
      model: String(process.env.MODEL),
      temperature: 0.4,
    })

    const response = responseIA.choices[0].message.content

    return response;
  }
}

export {OpenIaProvider}