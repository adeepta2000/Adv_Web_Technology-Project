import { Injectable } from "@nestjs/common";
import { CustomerProfileEntity } from "./customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerProfileDTO } from "./customer.dto";

@Injectable()
export class customerService {
  create(customerEntity: CustomerProfileEntity): CustomerProfileEntity | PromiseLike<CustomerProfileEntity> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(CustomerProfileEntity) 
    private customerRepo: Repository<CustomerProfileEntity>
  )
  {}
  getAll(): Promise<CustomerProfileEntity[]> {
    return this.customerRepo.find(
      {
        select:{
          customerID: true,
          email: true,
        
        }
        
      }
    );
  }

getUserByID(id:number): Promise<CustomerProfileEntity> {
return this.customerRepo.findOneBy({customerID:id});
}



  async addcustomer(customerInfo:CustomerProfileEntity):Promise<CustomerProfileEntity[]>
  {
   const res = await this.customerRepo.save(customerInfo);
   return this.customerRepo.find();
  }

  updatecustomer(id:number, customerInfo:CustomerProfileDTO):Promise<CustomerProfileEntity>
  {
   const res=  this.customerRepo.update(id,customerInfo);

     return this.customerRepo.findOneBy({customerID:id});
  }

  async createCustomer(customerEntity:CustomerProfileEntity): Promise<CustomerProfileEntity>{
    return await this.customerRepo.save(customerEntity);
  }
async addCustomer(customerInfo:CustomerProfileEntity):Promise<CustomerProfileEntity[]>
{
  const res = await this.customerRepo.save(customerInfo);
  return this.customerRepo.find();
}
}