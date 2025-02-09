// // Importa las dependencias necesarias
// import { UuidAdapter } from '../../config/uuid.adapter'; // Para generar IDs únicos
// import { Ticket } from '../../domain/interfaces/ticket'; // Interfaz que define la estructura de un ticket
// import { WssService } from './wss.service'; // Servicio para enviar mensajes a través de WebSocket

// // Clase principal que maneja la lógica de los tickets
// export class TicketService {

//   // El constructor inicializa el servicio WebSocket (WssService) como una instancia compartida
//   constructor(
//     private readonly wssService = WssService.instance,
//   ) {}

//   // Arreglo de tickets iniciales con algunos valores predeterminados
//   public tickets: Ticket [] = [
//     { id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
//     { id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
//     { id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
//     { id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
//     { id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
//     { id: UuidAdapter.v4(), number: 6, createdAt: new Date(), done: false },
//   ];

//   // Arreglo privado que contiene los tickets en los que se está trabajando
//   private readonly workingOnTickets: Ticket[] = [];

//   // Getter para obtener los tickets pendientes (aquellos que no tienen asignado un escritorio)
//   public get pendingTickets(): Ticket[] {
//     return this.tickets.filter(ticket => !ticket.handleAtDesk); // Filtra los tickets que aún no se han manejado
//   }

//   // Getter para obtener los últimos 4 tickets en los que se está trabajando
//   public get lastWorkingOnTickets(): Ticket[] {
//     return this.workingOnTickets.slice(0, 4); // Devuelve solo los primeros 4 tickets de la lista
//   }

//   // Getter para obtener el número del último ticket
//   public get lastTicketNumber(): number {
//     return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0; // Obtiene el número del último ticket
//   }

//   // Método para crear un nuevo ticket
//   public createTicket() {
//     // Crea un nuevo ticket con ID único, número incremental, fecha de creación y marcado como no realizado
//     const ticket: Ticket = {
//       id: UuidAdapter.v4(),
//       number: this.lastTicketNumber + 1,
//       createdAt: new Date(),
//       done: false,
//       handleAt: undefined,
//       handleAtDesk: undefined,
//     }

//     // Añade el nuevo ticket a la lista de tickets
//     this.tickets.push(ticket);
//     // Llama a la función para notificar que el número de tickets ha cambiado
//     this.onTicketNumberChanged();

//     // Devuelve el ticket recién creado
//     return ticket;
//   }

//   // Método para "extraer" un ticket, asignándole un escritorio
//   public drawTicket(desk: string) {

//     // Busca un ticket que no esté asignado a ningún escritorio
//     const ticket = this.tickets.find(t => !t.handleAtDesk);
//     if (!ticket) return { status: 'error', message: 'No hay tickets pendientes' }; // Si no hay tickets pendientes, retorna un error

//     // Asigna el escritorio y la fecha de manejo al ticket
//     ticket.handleAtDesk = desk;
//     ticket.handleAt = new Date();

//     // Añade el ticket a la lista de tickets en los que se está trabajando
//     this.workingOnTickets.unshift({...ticket});
//     // Notifica sobre el cambio en el número de tickets pendientes
//     this.onTicketNumberChanged();
//     // Notifica sobre el cambio en los tickets en los que se está trabajando
//     this.onWorkingOnChanged();

//     // Devuelve el estado de éxito y el ticket
//     return { status: 'ok', ticket }
//   }

//   // Método para marcar un ticket como finalizado
//   public onFinishedTicket(id: string) {
//     // Busca el ticket con el ID proporcionado
//     const ticket = this.tickets.find(t => t.id === id);
//     if (!ticket) return { status: 'error', message: 'Ticket no encontrado' }; // Si no se encuentra el ticket, retorna un error

//     // Actualiza el estado del ticket a 'done' (terminado)
//     this.tickets = this.tickets.map(ticket => {
//       if (ticket.id === id) {
//         ticket.done = true;
//       }
//       return ticket;
//     });

//     // Devuelve el estado de éxito
//     return { status: 'ok' }
//   }

//   // Método privado para notificar sobre el cambio en el número de tickets pendientes
//   private onTicketNumberChanged() {
//     this.wssService.sendMessage('on-ticket-count-changed', this.pendingTickets.length); // Envía el número de tickets pendientes a través de WebSocket
//   }

//   // Método privado para notificar sobre el cambio en los tickets en los que se está trabajando
//   private onWorkingOnChanged() {
//     this.wssService.sendMessage('on-working-changed', this.lastWorkingOnTickets); // Envía la lista de los últimos 4 tickets en los que se está trabajando a través de WebSocket
//   }
// }
