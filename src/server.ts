import fastify, {FastifyInstance} from "fastify";
import cookie from '@fastify/cookie'
import { env } from "./env"
import { tasksRoutes } from "./routes/tasks";
import { authRoutes } from "./routes/auth";
import cors from '@fastify/cors';

const app = fastify();

app.register(cookie)
app.register(cors, {
    origin: 'http://localhost:3003', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT','DELETE'], // Allow only GET and POST requests
    credentials: true
});

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