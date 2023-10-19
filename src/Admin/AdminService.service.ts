import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./Entities/AdminEntity.entity";
import { Repository } from "typeorm";
import { AdminForm } from "./DTOs/AdminForm.dto";

@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(AdminEntity) 
        private adminRepo: Repository<AdminEntity>
      ){}

      getAll(): Promise<AdminEntity[]>{
        return this.adminRepo.find();
      }

      getAdminById(id:number): Promise<AdminEntity>{
        return this.adminRepo.findOneBy({id:id});
      }

      async addAdmin(adminInfo: AdminForm): Promise<AdminEntity[]>{

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
}