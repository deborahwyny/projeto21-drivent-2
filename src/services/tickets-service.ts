import { notFoundError } from "@/errors";
import { newTicket, ticketsRepository } from "@/repositories"
import { error } from "console";
import { enrollmentsService } from "./enrollments-service";
import { number } from "joi";
import { TicketStatus } from "@prisma/client";



 async function getTicketsTservice(){

    const tickets = await ticketsRepository.findTickets();
    return tickets;
  
}


async function postTicketSerive(ticketTypeId: number,userId: number) {

  // try{
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId)
    if (!enrollment) { throw notFoundError() }


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
  if (!enrollment) { throw notFoundError() }

  
  const tickesReturn = await ticketsRepository.ticketsRepo(enrollment.id)
  if (!tickesReturn) { throw notFoundError() }

  const ticketType = await ticketsRepository.ticketTypeId(tickesReturn.ticketTypeId);

  const response = {
    id: tickesReturn.id, 
    status: tickesReturn.status,
    ticketTypeId: tickesReturn.ticketTypeId,
    enrollmentId: tickesReturn.enrollmentId,
    TicketType: {
      createdAt: ticketType.createdAt,
      id: ticketType.id,
      includesHotel: ticketType.includesHotel,
      name: ticketType.name,
      price: ticketType.price,
      isRemote: ticketType.isRemote,
      updatedAt: ticketType.updatedAt,
    },
    createdAt: tickesReturn.createdAt, 
    updatedAt: tickesReturn.updatedAt, 
  };
console.log("tikectReturn",tickesReturn)

  return response


}


export const ticketsTypesService ={
    getTicketsTservice,
    postTicketSerive,
    servicesTickets
    
}