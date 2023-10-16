import { Module } from "@nestjs/common";
import { EmployeeController } from "./EmployeeController.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "./EmployeeEnitity.entity";

@Module({
    imports:[TypeOrmModule.forFeature([EmployeeEntity])],
    controllers:[EmployeeController],
    providers: []
})
export class EmployeeModule{}