import fastify from "fastify";
import { askTextToSqlRoutes } from "@/http/controllers/ask-text-to-sql/routes";

export const app = fastify()

app.register(askTextToSqlRoutes)