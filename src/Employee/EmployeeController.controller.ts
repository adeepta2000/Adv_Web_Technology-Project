import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { EmployeeForm } from "./DTOs/EmployeeForm.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";




const users = [
    { id: 1, FirstName: "Asif Al", LastName: "Mamun", Username: "Rafi", Email: "asif@gmail.com", Address:"Nikunja-2", Password:"asif12345"},
    { id: 2, FirstName: "Niloy", LastName: "Kumer", Username: "Saha", Email: "niloy@gmail.com", Address:"Mirpur", Password:"niloy12345"}
];

@Controller('/employee')
export class EmployeeController
{
    @Get('/index')
    getUser() : any{
        return 'hello world';
    }

    @Get('/:id')
    getUserById(@Param('id') id: number): any {

        const user = users.find((user) => user.id == id);

        if (!user) {
            throw new NotFoundException (`User with ID ${id} not found`);
        }

        return user;
    }
    @Post('/create')
    createAdmin(@Body() employeeData: EmployeeForm): any {
    
        return {
            message: "Employee created successfully",
            data: employeeData,
        };
    }

    @Put('/updateEmployee/:id')
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

        const user = users.find((user) => user.id == id);

        if (!user) {
            throw new NotFoundException (`User with ID ${id} not found`);
        }

        return user;
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
   

}