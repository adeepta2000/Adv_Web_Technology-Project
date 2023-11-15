import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmployeeForm } from "./DTOs/EmployeeForm.dto";
import { EmployeeEntity } from "./Entities/EmployeeEntity.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";



@Injectable()
export class EmployeeService {
  
  constructor(
    @InjectRepository(EmployeeEntity) 
    private EmployeeRepo: Repository<EmployeeEntity>,
    private readonly mailerService: MailerService,
  )
  {}
  getAll(): Promise<EmployeeEntity[]> {
    return this.EmployeeRepo.find()
  }

  getUserByID(id:number): Promise<EmployeeEntity> {
    return this.EmployeeRepo.findOneBy({id:id});
    }

    async addEmployee(employeefrom:EmployeeForm):Promise<EmployeeEntity[]>
    {
     const res = await this.EmployeeRepo.save(employeefrom);
     return this.EmployeeRepo.find();
    }

    updateEmployee(id:number, employeefrom:EmployeeForm):Promise<EmployeeEntity>
    {
     const res=  this.EmployeeRepo.update(id,employeefrom);
  
       return this.EmployeeRepo.findOneBy({id});
    }

    async deleteEmployee(id:number):Promise<void>{
      await this.EmployeeRepo.delete(id); 
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