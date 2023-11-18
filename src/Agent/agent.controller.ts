import { Body, Controller, Get, Query, Param, Post, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, Put, Delete, Session, HttpException, HttpStatus, UseGuards, UnauthorizedException, Patch } from '@nestjs/common';
import { SupportDTO, agentDTO, agentLogin, bookingsInfo, tourPackagesInfo } from './agent.dto';
import { FileInterceptor,  } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { agentService } from './agent.service';
import { SupportEntity, agentEntity, agentbookingsEntity, agenttourPackagesEntity} from './agent.entity';
import { SessionGuard } from './agent.guard';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: agentService,
    private readonly mailerService: MailerService) {}
  

    @Get('id')
    getHello(): string {
      return "hello Mars";
    }
    

    @Get('/searchuserbyquery')
    searchUserByQuery(@Query()myquery:object):object{
        return myquery
    }

@Post('uploadImage')  
@UseInterceptors(FileInterceptor('file',
{ fileFilter: (req, file, cb) => {
if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
cb(null, true);
else {
cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
}
},
limits: { fileSize: 3000000 },
storage:diskStorage({
destination: './uploads',
filename: function (req, file, cb) {
cb(null,Date.now()+file.originalname)
},
})
}))
uploadFile(@UploadedFile() file: Express.Multer.File) {
console.log(file);
}

//DB related controllers
@Get('/getimage/:name')  //localhost:3000/agent/getimage/name.png GET
getImages(@Param('name') name:string, @Res() res) {
res.sendFile(name,{ root: './uploads' })
}



//CREATE NEW AGENTs
@Post('create')    //localhost:3000/agent/create
@UsePipes(new ValidationPipe())
async createAgent(@Body() agentData: agentDTO): Promise<agentEntity> {
  return this.agentService.createAgent(agentData);
}



//Get All Agents
@Get('agentindex')     //localhost:3000/agent/agentindex
getIndex(@Session() session) {
  return this.agentService.getAll();
  
}



//Get all tour packages 
@Get('getpackages')      
@UseGuards(SessionGuard)
getAllTourPackages(): Promise<agenttourPackagesEntity[]> {
  return this.agentService.getAllTourPackages();
}

//Update Agent by id
@Put('/update/:id')   
@UseGuards(SessionGuard) 
@UsePipes(new ValidationPipe())
updateAdmin(@Param('id') id: number, @Body() agentInfo: agentDTO) {
  return this.agentService.updateAgent(id, agentInfo);
}


//DELETE AGENTS
@Delete('/delete/:id')
@UseGuards(SessionGuard)
async deleteAgent(@Param('id') id: number): Promise<void> {
  return this.agentService.deleteAgent(id);
  }
//CREATE NEW TOUR PACKAGES
@Post('addtourpackage') // Define the POST route for adding tour packages
  @UsePipes(new ValidationPipe()) // You can use validation if needed
  async addTourPackages(@Body() tourPackages: tourPackagesInfo): Promise<agenttourPackagesEntity[]> {

    const updatedTourPackages = await this.agentService.addTourPackages(tourPackages);
    return updatedTourPackages;
  }

@Delete('tour-packages/:tourId')
@UseGuards(SessionGuard)
async deleteTourPackage(@Param('tourId') tourId: number): Promise<void> {
  return this.agentService.deleteTourPackage(tourId);
}
//Get tour packages by creator_id
@Get('creator/:id')
  getTourPackagesByCreatorId(@Param('id') creatorId: number): Promise<agenttourPackagesEntity[]> {
    return this.agentService.getTourPackagesByCreatorId(creatorId);
  }


@Post('addbookings')
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
async addbookings(@Body() bookings: bookingsInfo): Promise<agentbookingsEntity> {
  return this.agentService.addbookings(bookings);
}




@Post('login')
async login(@Body() credentials: agentLogin, @Session() session) {
  try {
    if (await this.agentService.login(credentials)) {
      session.email = credentials.email; // Set the email in the session
      return { message: 'Login successful' };
    }
  } catch (error) {
    throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED)
  }
}


  //mailer
  @Post('sendemail')
  async sendEmail() {
    try {
      const result = await this.mailerService.sendMail({
        to: 'movienamabo772@gmail.com', // Recipient's email address
        subject: 'Test Email', // Email subject
        text: 'This is a test email.', // Email content
      });
      return { message: 'Email sent successfully', result };
    } catch (error) {
      console.error('Email sending failed:', error.message || error);
      throw new Error('Email sending failed');
    }
  }
  
  @Post('addsupport')
  async createSupport(@Body() supportData: Partial<SupportEntity>): Promise<SupportEntity> {
    return this.agentService.createSupport(supportData);
  }

  @Get('getSupport')      
  @UseGuards(SessionGuard)
  getAllSupport(): Promise<SupportEntity[]> {
    return this.agentService.getAllSupport();
  }

  @Put('/updateSupport/:booking_id')
  async updateSupport(
    @Param('booking_id') booking_id: number,
    @Body() supportDTO: SupportDTO,
  ): Promise<SupportEntity> {
    return this.agentService.updateSupport(booking_id, supportDTO);
  }

}
