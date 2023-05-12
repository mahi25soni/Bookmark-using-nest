import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports : [JwtModule.register({
        global: true,
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: process.env.EXPIRES_IN },
      })],
    providers : [AuthService, PrismaService, JwtStrategy],
    controllers : [AuthController],
    exports : [AuthService]
})
export class AuthMudule {}