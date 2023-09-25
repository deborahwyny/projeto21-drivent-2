import { notFoundError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import { enrollmentsService, ticketsTypesService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';



export async function getTicketsTypes(req: AuthenticatedRequest, res: Response){
  
    try {
        const tickets = await ticketsTypesService.getTicketsTservice()
        return res.send(tickets)   

    } catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT)
    }
}


export async function postTickets(req:AuthenticatedRequest, res: Response) {
    const  userId  = req.userId;
    console.log("userId", userId)

    const {ticketTypeId} = req.body
    console.log("ticketTypeId", ticketTypeId)


    if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

    try{
        const ticketsPost = await ticketsTypesService.postTicketSerive(ticketTypeId,userId)
        return res.status(httpStatus.CREATED).send(ticketsPost); // Configura o status HTTP para 201

    } catch(error){
        return res.sendStatus(httpStatus.NOT_FOUND)

    }
}


export async function getTickets(req: AuthenticatedRequest, res: Response){
    const { userId } = req;
    console.log("userId",userId)
    try{
        const getControlletresTicket = await ticketsTypesService.servicesTickets(userId);
        console.log("getControlletresTicket",getControlletresTicket)
        


        return res.send(getControlletresTicket)   


    } catch(error){
        return res.sendStatus(httpStatus.NOT_FOUND)

    }

}    
