import OpenAI from "openai";
import { generateResponseSqlProps, IAiProvider } from "../i-ai";
import { AiError } from "../errors/openAi";

class OpenIaProvider implements IAiProvider{
  private openAi: OpenAI;

  constructor() {
    const apiKey = process.env.KEY_IA;
    const model = process.env.MODEL;

    if (!apiKey || !model) {
      throw new Error("API key or model environment variable is missing.");
    }

    this.openAi = new OpenAI({
      apiKey: process.env.KEY_IA,
    });
  }

  async generateResponseSql({schemaContext, request}: generateResponseSqlProps){
    try {
      const context = JSON.stringify(schemaContext);
  
      const prompt = `${context} este é o schema do banco de dados. Baseado nisto, responda transformando a linguagem naratual em sql. Não adicione campos que não existe para tentar completar a query. A pergunta é: ${request}`;
  
      const responseIA = await this.openAi.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              `Você é uma assistente virtual que transforma a linguagem natural da pergunta do usuário em um SQL baseado no schema de banco de dados passado. Seja suscinta. Não precisa formatar o texto e nem inserir espaços e nem quebrar linhas.`,
          },
          {
            role: "user",
            content: prompt
          },
        ],
        model: String(process.env.MODEL),
        temperature: 0.2,
      })
  
      const response = responseIA.choices[0].message.content
      return response;        

    } catch (error) {
      throw new AiError('Ops! Houve uma falhar na integração com o modelo de LLM. Por favor contate os administradores para resolver a questão', 400);
    }
  }
}

export {OpenIaProvider}