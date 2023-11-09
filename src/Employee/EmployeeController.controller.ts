import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { EmployeeForm } from "./DTOs/EmployeeForm.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { EmployeeService } from "./EmployeeService.services";



@Controller('employee')
export class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

    @Get('/index')
    getUser() : any{
        return 'Welcome to Employee';
    }
    @Get('index')
    getIndex() {
      return this.EmployeeService.getAll();
    }
    @Get('/allemplyeeid')
    getUserById(@Param('id') id: number): any {

        return this.EmployeeService.getAll();
    }
    
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
addAdmin(@Body() EmployeeForm:EmployeeForm, @UploadedFile()  myfile: Express.Multer.File) {
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

    @Get('/Customerdetails')
    getCustomer() : any{
        return 'Welcome to Customerdetails';
    }

    @Get('/:id')
    getCustomerById(@Param('id') id: number): any {

       

        return null;
}

@Get('/packages')
getAllPackages() :any{
    return null;
}

@Get('/package/:id')
getPackageById(@Param('id') id: number): any {


    return null;
}


@Put('/updatepackage/:id')
updatePackage(){
    return 'Package Updated Succesfully';
}

@Delete('/deletepackage/:id')
deletePackage(){
      return 'Package is deleted';
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