import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import {  SupportEntity, agentEntity, agentbookingsEntity, agenttourPackagesEntity } from './agent.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { agentService } from './agent.service';
import { AgentController } from './agent.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([agentEntity, agenttourPackagesEntity, agentbookingsEntity, SupportEntity]),
  MailerModule.forRoot({
    transport:{
      host:'smtp.gmail.com',
      port:465,
      secure:true,
      auth:{
        user:'sakib.ahsan.35@gmail.com',
        pass:'wnde lovr wgum twec',
      }
    }, defaults:{
      from: 'sakib.ahsan.35@gmail.com',
    }
  })],
  controllers: [AgentController],
  providers: [AppService, agentService],
})
export class AgentModule {}

