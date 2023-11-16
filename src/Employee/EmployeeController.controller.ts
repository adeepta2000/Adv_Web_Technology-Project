import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Session, UnauthorizedException, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { EmployeeForm } from "./DTOs/EmployeeForm.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { EmployeeService } from "./EmployeeService.services";
import { EmployeeEntity } from "./Entities/EmployeeEntity.entity";



@Controller('employee')
export class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

    @Get('/index')
    getEmployee() : any{
        return 'Welcome to Employee';

    
    }
    @Get('all')
    getIndex(@Session() session) {
      return this.EmployeeService.getAll();
    }
 
    @Get('/getadminby/:id')
    getEmployeeById(@Param('id', ParseIntPipe) id: number): Promise<EmployeeEntity> {

        return this.EmployeeService.getEmployeeByID(id);
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


@Put('/updateEmployee/:id')
@UsePipes(new ValidationPipe())
updateEmployee(@Param('id') id: number, @Body() employeeEntity: EmployeeEntity) {
  return this.EmployeeService.updateEmployee(id, employeeEntity);
}




@Delete('/deleteEmployee/:id')
deleteEmployee(@Param('id') id:number){
      return this.EmployeeService.deleteEmployee(id);
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


