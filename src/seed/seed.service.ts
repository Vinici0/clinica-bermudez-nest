import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SEED_DATA } from './data/seed-data';
@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async executeSeed() {
    // Check existing data
    const userCount = await this.prisma.user.count();
    const roleCount = await this.prisma.role.count();
    const statusCount = await this.prisma.ticketStatus.count();

    // Create or update roles
    for (const role of SEED_DATA.roles) {
      const existingRole = await this.prisma.role.findUnique({
        where: { name: role.name },
      });

      if (!existingRole) {
        await this.prisma.role.create({
          data: role,
        });
      }
    }

    // Create or update ticket status
    for (const status of SEED_DATA.ticketStatus) {
      const existingStatus = await this.prisma.ticketStatus.findUnique({
        where: { name: status.name },
      });

      if (!existingStatus) {
        await this.prisma.ticketStatus.create({
          data: status,
        });
      }
    }

    // Seed users
    for (const user of SEED_DATA.users) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        continue;
      }

      await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          user_roles: {
            create: {
              role: {
                connect: { name: user.role },
              },
            },
          },
        },
      });
    }

    return 'Seed executed successfully';
  }
}
