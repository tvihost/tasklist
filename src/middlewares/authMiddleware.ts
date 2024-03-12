import { knexQB } from "../config/database";
import { FastifyReply, FastifyRequest } from 'fastify'

function denyAccess(reply: FastifyReply)
{
  reply.code(401).send({ error: 'Unauthorized' })
  return
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    denyAccess(reply)
  }
  
  const checkSessionId = await knexQB('sessions').where('id',sessionId).first()

  if(!checkSessionId) {
    denyAccess(reply)
  }
}