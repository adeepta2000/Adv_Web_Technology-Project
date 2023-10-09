import { Module } from "@nestjs/common";
import { EmployeeController } from "./EmployeeController.controller";

@Module({
    imports:[],
    controllers:[EmployeeController],
    providers: []
})
export class EmployeeModule{}