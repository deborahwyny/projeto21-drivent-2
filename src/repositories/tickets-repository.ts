import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';
import { create } from 'domain';

export interface newTicket {
    ticketTypeId: number;
    enrollmentId: number;
    status: TicketStatus; 
  }

async function findTickets(){
 const result = await prisma.ticketType.findMany()
 console.log("oirep", result)
return result
}

async function createTicket(ticketData: newTicket) {
    console.log("createTicket", ticketData)

    const createdTicket = await prisma.ticket.create({
      data: ticketData,
    })
    return createdTicket

}


async function ticketsRepo(enrollmentId: number) {
    console.log("enrollmentId", enrollmentId)
    const enrollment = await prisma.ticket.findFirst({
    where: {
        enrollmentId: enrollmentId,
          },
        })
        return enrollment
    }


async function ticketTypeId(ticketTypeId: number){
    const result = await prisma.ticketType.findUnique({
        where:{
            id: ticketTypeId,

        }
    })
    return result
}

export const ticketsRepository = {
    findTickets,
    createTicket,
    ticketsRepo,
    ticketTypeId
}


//// tickets repository exportados no index