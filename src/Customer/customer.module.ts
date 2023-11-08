import { Module } from '@nestjs/common';
import { customerController } from './customer.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customerService } from './customer.service';
import { ConfirmedBookingsEntity, CustomerProfileEntity, PaymentsEntity, TourPackagesEntity } from './customer.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerProfileEntity, TourPackagesEntity, ConfirmedBookingsEntity, PaymentsEntity ]),],
  controllers: [customerController],
  providers: [AppService, customerService],
})
export class customerModule {}
