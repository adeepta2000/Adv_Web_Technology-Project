import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Admin/AdminModule.module';
import { EmployeeModule } from './Employee/EmployeeModule.module';

@Module({
  imports: [AdminModule, EmployeeModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
