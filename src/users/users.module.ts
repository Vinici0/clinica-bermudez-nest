import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    //El registerAsync soluciona el problema de que no se puede acceder a process.env.JWT_SECRET
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),

    /*
      Esto no funciona al momento de lavaantar el servidor, se debe de cambiar por un valor fijo
      JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
      }),
    */
  ],
})
export class UsersModule {}
