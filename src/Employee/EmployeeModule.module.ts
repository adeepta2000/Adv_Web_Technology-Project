import { Module } from "@nestjs/common";
import { EmployeeController } from "./EmployeeController.controller";
import { EmployeeService } from "./EmployeeService.services";
import { EmployeeEntity } from "./Entities/EmployeeEntity.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailerModule } from "@nestjs-modules/mailer";
import { HotelEntity } from "./Entities/HotelEntity.entity";
import { TravelGuideEntity } from "./Entities/TravelGuideEnity.entity";



@Module({
    imports:[MailerModule.forRoot({
        transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
        user: 'asifalmamunrafi2020@gmail.com',
        pass: 'tehs wjdc sbko bvlt'
        },
        }}),TypeOrmModule.forFeature([EmployeeEntity,HotelEntity,TravelGuideEntity])],
    controllers:[EmployeeController],
    providers: [EmployeeService]
})
export class EmployeeModule{}