import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Session, HttpException, HttpStatus, UnauthorizedException, UseGuards, Res } from "@nestjs/common";
import { AdminForm } from "./DTOs/AdminForm.dto";
import { EmployeeForm } from "src/Employee/DTOs/EmployeeForm.dto";
import { CustomerForm } from "src/Customer/DTOs/CustomerForm.dto";
import { ContentForm } from "./DTOs/ContentForm.dto";
import { PackageForm } from "./DTOs/PackageFrom.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { AdminService } from "./AdminService.service";
import { AdminEntity } from "./Entities/AdminEntity.entity";
import { SessionGuard } from "./Session.guard";
import { ContentEntity } from "./Entities/ContentEntity.entity";
import { PackageEntity } from "./Entities/PackageEntity.entity";

@Controller('/admin')
export class AdminController
{
    constructor(private readonly adminService: AdminService) {}

    @Post('/signin')
    async signin(@Session() session, @Body() mydto:AdminForm)
    {
        try {
            const result = await this.adminService.signin(mydto);
        
            if (result === 1) {
              session.email = mydto.email;
              console.log(session.email);

              return { message: "User Login Successful." };

            } 
            else {

              return { message: "Invalid email or password." };

            }
          } catch (error) {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: 'An error occurred during sign-in.',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
    }
    
    @Get('/signout')
    signout(@Session() session) {
        try {
            if (session != null) {
                
                if (session.destroy()) {
                    return { message: "You are logged out." };
                } 
                else {
                    throw new UnauthorizedException("You are not authorized to sign-out.");
                }
            } 
            else {
                console.log('No session found');
                return { message: "You are already logged out." };
            }
        } catch (error) {
            console.error('Error during sign-out:', error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'An error occurred during sign-out.',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('/index')
    @UseGuards(SessionGuard)
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

    @Get('/contents')
    getAllContents() :any{
        return this.adminService.getAllContent();
    }

    @Get('/content/:id')
    getContentById(@Param('id', ParseIntPipe) id: number): Promise<ContentEntity> {

        return this.adminService.getContentById(id);
    }

    @Post('/content/create')
    createContent(@Body() contentData: ContentForm) {
    
        return this.adminService.addContent(contentData);
    }

    @Put('/updatecontent/:id')
    updateContent(@Param('id') id:number, @Body() contentData:ContentForm){

        return this.adminService.updateContent(id,contentData);
    }

    @Delete('/deletecontent/:id')
    deleteContent(@Param('id') id:number){

        return this.adminService.deleteContent(id);
    }

    @Get('/packages')
    getAllPackages() :any{
        return this.adminService.getAllPackage();
    }

    @Get('/package/:id')
    getPackageById(@Param('id', ParseIntPipe) id: number): Promise<PackageEntity> {

        return this.adminService.getPackageById(id);
    }

    @Post('/package/create')
    createPackage(@Body() packageData: PackageForm) {
    
        return this.adminService.addPackage(packageData);
    }

    @Put('/updatepackage/:id')
    updatePackage(@Param('id') id:number, @Body() packageData: PackageForm){
        return this.adminService.updatePackage(id, packageData);
    }

    @Delete('/deletepackage/:id')
    deletePackage(@Param('id') id:number){
        return this.adminService.deletePackage(id);
    }

    @Post('/sendemail')
    sendEmail(@Body() mydata){
        return this.adminService.sendEmail(mydata);
    }


t

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

}