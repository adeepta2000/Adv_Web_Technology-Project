import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Session, UnauthorizedException, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { EmployeeForm } from "./DTOs/EmployeeForm.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { EmployeeService } from "./EmployeeService.services";
import { EmployeeEntity } from "./Entities/EmployeeEntity.entity";



@Controller('employee')
export class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

    @Get('/index')
    getUser() : any{
        return 'Welcome to Employee';

    
    }
    @Get('all')
    getIndex(@Session() session) {
      return this.EmployeeService.getAll();
    }
    @Get('/allemplyeeid')
    getUserById(@Param('id') id: number): any {

        return this.EmployeeService.getAll();
    }
    
   
//CREATE NEW Employee
@Post('addEmployee')
@UsePipes(new ValidationPipe())
@UseInterceptors(FileInterceptor('profilepic',
{ fileFilter: (req, file, cb) => {
  if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
   cb(null, true);
  else {
   cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
   }
  },
  limits: { fileSize: 3000000000 },
  storage:diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
   cb(null,Date.now()+file.originalname)
  },
  })
}
))
addEmployee(@Body() EmployeeForm:EmployeeForm, @UploadedFile()  myfile: Express.Multer.File) {
  EmployeeForm.filename = myfile.filename;
return this.EmployeeService.addEmployee(EmployeeForm);
}

    @Put('/updateEmployee')
    updateEmployee(){
        return 'Employee Updated Succesfully';
    }

    @Delete('/deleteEmployee/:id')
    deleteEmployee(){
          return 'Employee is deleted';
    }


    @Post('loginEmployee')
async login(@Body() credentials: EmployeeForm, @Session() session) {
  try {
    if (await this.EmployeeService.login(credentials)) {
      session.username = credentials.username; // Set the username in the session
      return { message: 'Login successful' };
    }
  } catch (error) {
    throw new UnauthorizedException('Invalid login credentials');
  }
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
        limits: { fileSize: 3000000 },
        storage:diskStorage({
            destination: './Uploads_Image',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return file;
    }

    
    @Post('/employeesendemail')
    sendEmail(@Body() mydata){
        return this.EmployeeService.sendEmail(mydata);
    }

}


