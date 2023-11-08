import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/AdminModule.module';
import { EmployeeModule } from './Employee/EmployeeModule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customerModule } from './Customer/customer.module';

@Module({
  imports: [AdminModule, EmployeeModule,customerModule,TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12web34',
    database: 'Tourism_Management_System',
    autoLoadEntities: true,
    synchronize: true,
    } ),
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
