import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from "@nestjs/common";
import { AdminForm, AdminUpdateInfo } from "./DTOs/AdminForm.dto";
import { AgentForm } from "src/Agent/DTOs/AgentForm.dto";
import { EmployeeForm } from "src/Employee/DTOs/EmployeeForm.dto";
import { CustomerForm } from "src/Customer/DTOs/CustomerForm.dto";
import { ContentForm } from "./DTOs/ContentForm.dto";
import { PackageForm } from "./DTOs/PackageFrom.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { AdminService } from "./AdminService.service";
import { AdminEntity } from "./Entities/AdminEntity.entity";

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

    @Post('/createadmin')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
    { fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        cb(null, true);
    else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }},
    limits: { fileSize: 30000 },
    storage:diskStorage({
        destination: './Uploaded_Image',
        filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
        },})
    }))
    addAdmin(@Body() adminInfo:AdminForm, @UploadedFile()  myfile: Express.Multer.File) {
        adminInfo.filename = myfile.filename;
        return this.adminService.addAdmin(adminInfo);
    }

    @Put('/updateadmin/:id')
    updateAdmin(@Param('id') id:number, @Body() adminInfo:AdminForm){
        return this.adminService.updateAdmin(id,adminInfo);
    }

    @Delete('/deleteadmin/:id')
    deleteAdmin(@Param('id') id:number){
          return this.adminService.deleteAdmin(id);
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

        return null;
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

        return null;
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
        return null;
    }

    @Get('/content/:id')
    getContentById(@Param('id') id: number): any {

        return null;
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
        return null;
    }

    @Get('/package/:id')
    getPackageById(@Param('id') id: number): any {

        return null;
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

    @Post('/sendemail')
    sendEmail(@Body() mydata){
        return this.adminService.sendEmail(mydata);
    }


    

}