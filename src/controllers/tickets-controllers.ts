import { AuthenticatedRequest } from '@/middlewares';
import { ticketsTypesService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';



export async function getTicketsTypes(req: AuthenticatedRequest, res: Response){
    const { userId } = req;

    try {
        const tickets = await ticketsTypesService.getTicketsTservice();
        console.log("tickets con",tickets)
        
        res.status(httpStatus.OK).json({ tickets });
    } catch (error) {
        console.error(`Erro ao obter ingressos: ${error.message}`);
        
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao obter ingressos.' });
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
        res.status(httpStatus.OK).json({ ticketsPost });

    } catch(error){
        console.error(`Erro ao obter ingressos: ${error.message}`);
        
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao obter ingressos.' });
    }
}


export async function getTickets(req: AuthenticatedRequest, res: Response){
    const { userId } = req;
    console.log("userId",userId)
    try{
        const getControlletresTicket = await ticketsTypesService.servicesTickets(userId);
        console.log("getControlletresTicket",getControlletresTicket)


        res.status(httpStatus.OK).json({ getControlletresTicket });


    } catch(error){
        console.error(`Erro ao obter ingressos: ${error.message}`);
        
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao obter ingressos.' });
    }

}    
