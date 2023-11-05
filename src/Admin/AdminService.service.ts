import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./Entities/AdminEntity.entity";
import { Repository } from "typeorm";
import { AdminForm } from "./DTOs/AdminForm.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(AdminEntity) 
        private adminRepo: Repository<AdminEntity>,
        private readonly mailerService: MailerService,
      ){}

      getAll(): Promise<AdminEntity[]>{
        return this.adminRepo.find();
      }

      getAdminById(id:number): Promise<AdminEntity>{
        return this.adminRepo.findOneBy({id:id});
      }

      async addAdmin(adminInfo: AdminForm): Promise<AdminEntity[]>{

        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(adminInfo.password, salt);
        adminInfo.password= hassedpassed;
        const response = await this.adminRepo.save(adminInfo);
        return this.adminRepo.find();

      }

      updateAdmin(id:number, adminInfo:AdminForm): Promise<AdminEntity>{

        const response = this.adminRepo.update(id,adminInfo);
        return this.adminRepo.findOneBy({id});

      }

      async deleteAdmin(id:number):Promise<void>{
        await this.adminRepo.delete(id); 
      }

      async sendEmail(mydata) {
        try {
          const result = await this.mailerService.sendMail({
            to: mydata.to,
            subject: mydata.subject,
            text: mydata.text
          });

          return {message: 'Email sent successfully'};

        } catch (error) {
      
          return { message: 'Email could not be sent', error: error.message };
        }
      }

}