import { getTickets, getTicketsTypes, postTickets } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { authenticationRepository } from '@/repositories';
import { Router } from 'express';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken)
ticketRouter.get("/types", getTicketsTypes)
ticketRouter.post("/", postTickets)
ticketRouter.get("/",getTickets)

export { ticketRouter };