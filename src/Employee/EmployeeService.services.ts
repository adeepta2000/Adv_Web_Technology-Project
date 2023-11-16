import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmployeeForm } from "./DTOs/EmployeeForm.dto";
import { EmployeeEntity } from "./Entities/EmployeeEntity.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";
import { HotelEntity } from "./Entities/HotelEntity.entity";
import { TravelGuideEntity } from "./Entities/TravelGuideEnity.entity";
import { PasswordUtils } from "./EmployeeUntils.ts/bcrypt";
import * as bcrypt from 'bcrypt';


@Injectable()
export class EmployeeService {
  
  constructor(
    @InjectRepository(EmployeeEntity) 
    private EmployeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(HotelEntity)
    private HotelRepo:Repository<HotelEntity>,
    @InjectRepository(TravelGuideEntity)  
    private TravelGuideRepo:Repository<TravelGuideEntity>,
    
    private readonly mailerService: MailerService,
    
  )
  {}
  getAll(): Promise<EmployeeEntity[]> {
    return this.EmployeeRepo.find()
  }

  getEmployeeByID(id:number): Promise<EmployeeEntity> {
    return this.EmployeeRepo.findOneBy({id:id});
    }


    //CREATE NEW Employee
    async addEmployee(employeeForm: EmployeeForm): Promise<EmployeeEntity[]>{

      const salt = await bcrypt.genSalt();
      const hassedpassed = await bcrypt.hash(employeeForm.password, salt);
      employeeForm.password= hassedpassed;
      const response = await this.EmployeeRepo.save(employeeForm);
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

    //Login using EmployeeForm
async login(credentials: EmployeeForm): Promise<boolean> {
  const employee = await this.EmployeeRepo.findOne({ where: { username: credentials.username } });

  if (!employee) {
    throw new UnauthorizedException('Employee not found');
  }

  // Use your preferred method to compare the hashed password
  const passwordMatch = await PasswordUtils.comparePassword(credentials.password, employee.password);

  if (!passwordMatch) {
    throw new UnauthorizedException('Invalid password');
  }

  return true;
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