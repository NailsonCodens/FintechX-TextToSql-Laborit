import OpenAI from "openai";
import { generateResponseSqlProps, IIaProvider } from "./i-ia";

class OpenIaProvider implements IIaProvider{
  private openAi: OpenAI;

  constructor() {
    this.openAi = new OpenAI({
      apiKey: process.env.KEY_IA,
    });
  }

  async generateResponseSql({schemaContext, request}: generateResponseSqlProps){
    const prompt = `
      Database Schema:
      ${schemaContext}
    `;

    this.openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a wizard who converts natural language text to SQL based on the data from the passed database schema. Be succinct, just bringing the sql in the answer.",
        },
        {
          role: "user",
          content: `Convert this natural language query to SQL: ${request}`
        },
      ],
      model: `${process.env.model}`,
      temperature: 0.4,
    })

    return 'ok'
  }
}

export {OpenIaProvider}