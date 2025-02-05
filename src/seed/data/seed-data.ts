import * as bcrypt from 'bcrypt';

/**
 * Interfaces opcionales para tipar tus datos
 */
interface SeedRole {
  name: string;
  description?: string;
}

interface SeedUser {
  name: string;
  email: string;
  password: string; // ya encriptado
  role: string; // nombre del rol al que se vincula
}

interface SeedTicketStatus {
  name: string;
  description: string;
}

interface SeedData {
  roles: SeedRole[];
  users: SeedUser[];
  ticketStatus: SeedTicketStatus[];
}

/**
 * Crea y exporta tus datos de seed.
 * Ojo: Aquí usaremos `bcrypt.hashSync` para generar los hashes de las contraseñas.
 */
export const SEED_DATA: SeedData = {
  // 1. Roles
  roles: [
    { name: 'ADMIN', description: 'Administrator role' },
    { name: 'SUPER_USER', description: 'Super user role' },
    { name: 'USER', description: 'Standard user role' },
  ],

  // 2. Usuarios (cada uno con un único rol diferente)
  users: [
    {
      name: 'Admin User',
      email: 'admin@myapp.com',
      password: bcrypt.hashSync('AdminPass123', 10), // Contraseña encriptada
      role: 'ADMIN',
    },
    {
      name: 'Super User',
      email: 'super@myapp.com',
      password: bcrypt.hashSync('SuperPass123', 10),
      role: 'SUPER_USER',
    },
    {
      name: 'Normal User',
      email: 'user@myapp.com',
      password: bcrypt.hashSync('UserPass123', 10),
      role: 'USER',
    },
  ],

  // 3. Estados de tickets
  ticketStatus: [
    {
      name: 'OPEN',
      description: 'Ticket is open',
    },
    {
      name: 'IN_PROGRESS',
      description: 'Ticket is in progress',
    },
    {
      name: 'CLOSED',
      description: 'Ticket is closed',
    },
  ],
};
