import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportEntity, agentEntity, agentbookingsEntity, agenttourPackagesEntity } from './agent.entity'; 
import { Repository } from 'typeorm';
import { SupportDTO, agentDTO, agentLogin, bookingsInfo, tourPackagesInfo } from './agent.dto'; 
import { PasswordUtil } from './Utils.ts/bcrypt';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class agentService {
  findOne(id: number): agentEntity | PromiseLike<agentEntity> {
    throw new Error('Method not implemented.');
  
  }
  find(): agentEntity[] | PromiseLike<agentEntity[]> {
    throw new Error('Method not implemented.');
  }
  findtour(): agenttourPackagesEntity[] | PromiseLike<agenttourPackagesEntity[]> {
    throw new Error('Method not implemented.');
  }


  
  
  
  constructor(
    @InjectRepository(agentEntity) 
    private agentRepo: Repository<agentEntity>,
    @InjectRepository(agenttourPackagesEntity)
    private agentPackagesRepo:Repository<agenttourPackagesEntity>,
    @InjectRepository(agentbookingsEntity)  
    private agentBookingsRepo:Repository<agentbookingsEntity>,
    private readonly mailerService: MailerService,
    @InjectRepository(SupportEntity)
    private agentsupportRepo:Repository<SupportEntity>,
    )
    
  
  {}


//CREATE NEW AGENT
async createAgent(agentData: agentDTO): Promise<agentEntity> {
  // Hash the agent's password using the utility function
  const hashedPassword = await PasswordUtil.encodePassword(agentData.password);
  agentData.password = hashedPassword;

  const { email } = agentData;
  const existingAgent = await this.agentRepo.findOne({ where: { email } });

  if (existingAgent) {
    throw new Error('An agent with the same email already exists.');
  }

  const agent = this.agentRepo.create(agentData);

  return this.agentRepo.save(agent);
}

async addTourPackages(tourPackages:tourPackagesInfo):Promise<agenttourPackagesEntity[]>
{
 const res = await this.agentPackagesRepo.save(tourPackages);
const agents = await this.agentRepo.find();

for(const agent of agents){
  const emailOptions = {
    to: agent.email,
    subject:'New Tour Package added',
    text: `Dear ${agent.name},\n\nA new tour package added`
  };
    await this.mailerService.sendMail(emailOptions)
  
}

 return this.agentPackagesRepo.find();
}

//Get all AGENTS
getAll(): Promise<agentEntity[]> {
  return this.agentRepo.find(
  );
}

async getAllTourPackages(): Promise<agenttourPackagesEntity[]> {
  return this.agentPackagesRepo.find();
}





//Update Agent by id
async updateAgent(id: number, agentDTO: agentDTO): Promise<agentEntity> {
  const agent = await this.agentRepo.findOne({ where: { id } });
  if (!agent) {
    throw new Error(`Agent with ID ${id} not found.`);
  }
  agent.name = agentDTO.name;
  agent.email = agentDTO.email;
  agent.password = agentDTO.password;
  

  return this.agentRepo.save(agent); 
}


//DELETE AGENT
async deleteAgent(id: number): Promise<void> {
  const agent = await this.agentRepo.findOne({ where: { id } });
  if (!agent) {
    throw new Error(`Agent with ID $id not found.`);
  }
  await this.agentRepo.remove(agent);
  console.log('Agent with ${id} is deleted');
}


async deleteTourPackage(tourId: number): Promise<void> {
  // Delete the tour package based on tour_id
  await this.agentPackagesRepo.delete({ tour_id: tourId });
}



//Create Bookings
async addbookings(bookings: bookingsInfo): Promise<agentbookingsEntity> {
  const res = await this.agentBookingsRepo.save(bookings);
  return res;
}

//Login using agentDTO
async login(credentials: agentLogin): Promise<boolean> {
  const agent = await this.agentRepo.findOne({ where: { email: credentials.email } });

  if (!agent) {
    throw new UnauthorizedException('Agent not found');
  }

  // Use your preferred method to compare the hashed password
  const passwordMatch = await PasswordUtil.comparePassword(credentials.password, agent.password);

  if (!passwordMatch) {
    throw new UnauthorizedException('Invalid password');
  }

  return true;
}

//Get tour packages by creator_id
async getTourPackagesByCreatorId(creatorId: number): Promise<agenttourPackagesEntity[]> {
  return this.agentPackagesRepo.find({
    where: { creator_id: creatorId },
  });
}


// Mailer
async sendEmail() {
  try {
    const result = await this.mailerService.sendMail({
      to: 'movienamabo772@gmail.com', // Recipient's email address
      subject: 'Test Email', // Email subject
      text: 'This is a test email.', // Email content
    });
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

async createSupport(supportData: Partial<SupportEntity>): Promise<SupportEntity> {
  const support = this.agentsupportRepo.create(supportData);
  return this.agentsupportRepo.save(support);
}

async getAllSupport(): Promise<SupportEntity[]> {
  return this.agentsupportRepo.find();
  }

  async updateSupport(booking_id: number, supportDTO: SupportDTO): Promise<SupportEntity> {
    const support = await this.agentsupportRepo.findOne({ where: { booking_id } });
    if (!support) {
      throw new Error(`Agent with ID ${booking_id} not found.`);
    }
    support.complaint = supportDTO.complaint;
    support.resolution = supportDTO.resolution;
    
  
    return this.agentsupportRepo.save(support); 
  }




}