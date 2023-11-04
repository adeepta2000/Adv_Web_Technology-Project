import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmployeeForm } from "./DTOs/EmployeeForm.dto";
import { EmployeeEntity } from "./Entities/EmployeeEntity.entity";


@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity) 
    private EmployeeRepo: Repository<EmployeeEntity>
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

    async deleteEmployee(id: number): Promise<void> {
        await this.EmployeeRepo.delete(id);
        }
        
  
}