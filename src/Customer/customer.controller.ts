import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AdminService } from "src/Admin/AdminService.service";
import { AdminEntity } from "src/Admin/Entities/AdminEntity.entity";

@Controller('/admin')
export class AdminController
{
    constructor(private readonly adminService: AdminService) {}

    
    @Get('/index')
    getAllAdmin() :any{
        return this.adminService.getAll();
    }

    @Get('/getadminby/:id')
    getAdminById(@Param('id', ParseIntPipe) id: number): Promise<AdminEntity> {

        return this.adminService.getAdminById(id);
    }
}