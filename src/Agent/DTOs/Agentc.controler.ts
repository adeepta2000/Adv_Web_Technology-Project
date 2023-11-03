import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

@Controller('/admin')
export class AdminController
{
    

    
    @Get('/index')
    getAllAdmin() :any{
        return null;
    }

    @Get('/getadminby/:id')
    getAdminById(@Param('id', ParseIntPipe) id: number){

       return null;
    }
}