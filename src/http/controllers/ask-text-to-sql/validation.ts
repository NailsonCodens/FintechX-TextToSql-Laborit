import { FastifyRequest } from "fastify"
import { z } from "zod"

async function validation(request: FastifyRequest){
    const createBodySchema = z.object({
        question: z.string(),
        result: z.boolean()
      })
    
      const { question, result } =
        createBodySchema.parse(request.body)
            
    return {question, result}
}

export {validation}