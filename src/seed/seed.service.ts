import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SEED_DATA } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async executeSeed() {
    const userCount = await this.prisma.user.count();
    const roleCount = await this.prisma.role.count();

    if (userCount > 0 || roleCount > 0) {
      throw new BadRequestException('El seed ya se ejecutó anteriormente');
    }

    for (const role of SEED_DATA.roles) {
      await this.prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: {
          name: role.name,
          description: role.description,
        },
      });
    }

    for (const user of SEED_DATA.users) {
      await this.prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
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

    return 'Seed ejecutado correctamente';
  }
}
