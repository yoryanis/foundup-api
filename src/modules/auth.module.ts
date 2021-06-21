import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../entities/strategies/jwt.strategy';
import { LocalStrategy } from '../entities/strategies/local.strategy';
import { UserModule } from './user.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ENCRYPTION,
      signOptions: { expiresIn: 86400 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
