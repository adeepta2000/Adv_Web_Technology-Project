import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from "@nestjs/common";
import { AdminForm } from "./DTOs/AdminForm.dto";
import { AgentForm } from "src/Agent/DTOs/AgentForm.dto";
import { EmployeeForm } from "src/Employee/DTOs/EmployeeForm.dto";
import { CustomerForm } from "src/Customer/DTOs/CustomerForm.dto";
import { ContentForm } from "./DTOs/ContentForm.dto";
import { PackageForm } from "./DTOs/PackageFrom.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

const users = [
    { id: 1, FirstName: "Adeepta", LastName: "Shushil", Username: "shuvo", Email: "shuvo@gmail.com", Address:"Nikunja-2", Password:"adee12345"},
    { id: 2, FirstName: "Shotodru", LastName: "Baidya", Username: "shoto", Email: "shoto@gmail.com", Address:"Agrabad", Password:"shoto12345"}
];

@Controller('/admin')
export class AdminController
{
    @Get('/index')
    getAllUsers() :any{
        return users;
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): any {

        const user = users.find((user) => user.id == id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    createAdmin(@Body() adminData: AdminForm): any {
    
        return {
            message: "Admin created successfully",
            data: adminData,
        };
    }

    @Put('/updateadmin/:id')
    updateAdmin(){
        return 'Admin Updated Succesfully';
    }

    @Delete('/deleteadmin/:id')
    deleteAdmin(){
          return 'Admin is deleted';
    }

    @Post('/imageupload')
    @UseInterceptors(FileInterceptor('myfile',{ fileFilter: (req, file, cb) => 
        {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
            cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage:diskStorage({
            destination: './Uploaded_Image',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return file;
    }

    @Post('/agent/create')
    createAgent(@Body() agentData: AgentForm): any {
    
        return {
            message: "Admin created successfully",
            data: agentData,
        };
    }

    @Get('/agent/:id')
    getAgentById(@Param('id') id: number): any {

        const user = users.find((user) => user.id == id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    @Put('/updateagent/:id')
    updateAgent(){
        return 'Agent Updated Succesfully';
    }

    @Delete('/deleteagent/:id')
    deleteAgent(){
          return 'Agent is deleted';
    }

    @Post('/employee/create')
    createEmployee(@Body() empData: EmployeeForm): any {
    
        return {
            message: "Admin created successfully",
            data: empData,
        };
    }

    @Get('/employee/:id')
    getEmployeeById(@Param('id') id: number): any {

        const user = users.find((user) => user.id == id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    @Put('/updateemployee/:id')
    updateEmployee(){
        return 'Employee Updated Succesfully';
    }

    @Delete('/deleteemployee/:id')
    deleteEmployee(){
          return 'Employee is deleted';
    }

    @Delete('/deletecustomer/:id')
    deleteCustomer(){
          return 'Customer is deleted';
    }

    @Get('/contents')
    getAllContents() :any{
        return users;
    }

    @Get('/content/:id')
    getContentById(@Param('id') id: number): any {

        const user = users.find((user) => user.id == id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    @Post('/content/create')
    createContent(@Body() adminData: AdminForm): any {
    
        return {
            message: "Admin created successfully",
            data: adminData,
        };
    }

    @Put('/updatecontent/:id')
    updateContent(){
        return 'Content Updated Succesfully';
    }

    @Delete('/deletecontent/:id')
    deleteContent(){
          return 'Content is deleted';
    }

    @Get('/packages')
    getAllPackages() :any{
        return users;
    }

    @Get('/package/:id')
    getPackageById(@Param('id') id: number): any {

        const user = users.find((user) => user.id == id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    @Post('/package/create')
    createPackage(@Body() adminData: AdminForm): any {
    
        return {
            message: "Package created successfully",
            data: adminData,
        };
    }

    @Put('/updatepackage/:id')
    updatePackage(){
        return 'Package Updated Succesfully';
    }

    @Delete('/deletepackage/:id')
    deletePackage(){
          return 'Package is deleted';
    }


    

}