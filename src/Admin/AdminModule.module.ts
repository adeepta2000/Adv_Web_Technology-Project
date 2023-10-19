import { Module } from "@nestjs/common";
import { AdminController } from "./AdminController.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./Entities/AdminEntity.entity";
import { AdminService } from "./AdminService.service";

@Module({
imports:[TypeOrmModule.forFeature([AdminEntity])],
controllers:[AdminController],
providers:[AdminService]
})
export class AdminModule{}