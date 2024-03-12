import fastify, {FastifyInstance} from "fastify";
import cookie from '@fastify/cookie'
import { env } from "./env"
import { tasksRoutes } from "./routes/tasks";
import { authRoutes } from "./routes/auth";

const app = fastify();

app.register(cookie)
app.register(authRoutes, {
    prefix: 'auth',
})
app.register(tasksRoutes, {
    prefix: 'tasks',
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log("Server running.")
})