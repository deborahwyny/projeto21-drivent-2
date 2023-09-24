import { notFoundError } from "@/errors";
import { newTicket, ticketsRepository } from "@/repositories"
import { error } from "console";
import { enrollmentsService } from "./enrollments-service";
import { number } from "joi";
import { TicketStatus } from "@prisma/client";



 async function getTicketsTservice(){
    try {
        const tickets = await ticketsRepository.findTickets();
        console.log("tickes service",tickets)
        return tickets;
      } catch (error) {
        console.error(`Erro ao obter ingressos: ${error.message}`);
        throw error; 
      }
    }


async function postTicketSerive(ticketTypeId: number,userId: number) {

  // try{
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId)

    if (!enrollment) {
      return {
        status: 404,
        message: 'Usuário não possui inscrição no evento.',
      };
    }
    console.log("enrollment", enrollment)

    const createTicket : newTicket = {
      ticketTypeId,
      enrollmentId:enrollment.id,
      status: TicketStatus.RESERVED
     }

     const ticketType = await ticketsRepository.ticketTypeId(ticketTypeId);
   


    const create = await ticketsRepository.createTicket(createTicket)

    const response = {
      id: create.id, 
      status: create.status,
      ticketTypeId: create.ticketTypeId,
      enrollmentId: create.enrollmentId,
      TicketType: {
        id: ticketType.id,
        name: ticketType.name,
        price: ticketType.price,
        isRemote: ticketType.isRemote,
        includesHotel: ticketType.includesHotel,
        createdAt: ticketType.createdAt,
        updatedAt: ticketType.updatedAt,
      },
      createdAt: create.createdAt, 
      updatedAt: create.updatedAt, 
    };
    
    console.log("create", create)
    return response

  // } catch(error){
  //   console.error(`Erro ao obter ingressos: ${error.message}`);
  //   throw error; 
  // }
  
}

async function servicesTickets(userId: number){
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId)
  if (!enrollment) {
    return {
      status: 404,
      message: 'Usuário não possui inscrição no evento.',
    };
  }

  const tickesReturn = await ticketsRepository.ticketsRepo(enrollment.id)
console.log("tikectReturn",tickesReturn)

  return tickesReturn


}


export const ticketsTypesService ={
    getTicketsTservice,
    postTicketSerive,
    servicesTickets
    
}