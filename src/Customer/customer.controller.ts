import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { CustomerProfileDTO } from "./customer.dto";
import { CustomerProfileEntity } from "./customer.entity";

@Controller('customer')
export class customerController 

     {
    customerService: any;
    
 @Post('add_customer') 
@UsePipes(new ValidationPipe ())
 Addcustomer(@Body()customerdto:CustomerProfileDTO):object{
    return customerdto
 }
 
 @Post('upload')
 @UseInterceptors(FileInterceptor('file',
 { fileFilter: (_req, file, cb) => {
   if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
     cb(null, true);
   else {
     cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
 }
 },
 limits: { fileSize: 3000000 },
   storage:diskStorage({
   destination: './uploads',
   filename: function (_req, file, cb) {
   cb(null,Date.now()+file.originalname)
 },
 })
 }))
 uploadFile(@UploadedFile() file: Express.Multer.File) {
   console.log(file);
 
  }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return 'Get user with ID: ' + id;

}
@Get('index')
getIndex() {
  return this.customerService.getAll();
}
@Get('/searchuserbyobject')
@UsePipes(new ValidationPipe())
searchUserByObject(@Body() myobject:CustomerProfileDTO): object {
  return {"username":myobject.fname};
}

//create new customer
@Post('createcustomer')
async create(@Body() customerEntity:CustomerProfileEntity): Promise<CustomerProfileEntity> {
  return await this.customerService.createCustomer(customerEntity)
}
}