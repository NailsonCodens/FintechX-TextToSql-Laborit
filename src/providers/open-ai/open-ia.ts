import OpenAI from "openai";
import { generateResponseSqlProps, IIaProvider } from "../i-ia";
import { AiError } from "../errors/openAi";

class OpenIaProvider implements IIaProvider{
  private openAi: OpenAI;

  constructor() {
    this.openAi = new OpenAI({
      apiKey: process.env.KEY_IA,
    });
  }

  async generateResponseSql({schemaContext, request}: generateResponseSqlProps){
    try {
      const context = JSON.stringify(schemaContext);
  
      const prompt = `${context} este é o schema do meu banco de dados, baseado nisto responda transformando a linguagem na atual em sql. A pergunta é: ${request}`;
  
      const responseIA = await this.openAi.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              `Você é uma assistente virtual que transforma a linguagem natural da pergunta do usuário em um SQL baseado no schema de banco de dados passado, seja suscinta. Não precisa formatar o texto e nem inserir espaços e nem quebrar linhas.`,
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

    } catch (error) {
      throw new AiError('Ops! Houve uma falhar na integração com o modelo de LLM. Por favor contate os administradores para resolver a questão', 400);
    }
  }
}

export {OpenIaProvider}