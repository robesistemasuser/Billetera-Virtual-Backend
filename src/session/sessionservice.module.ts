import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';  
import { SessionService } from './session.service';  

@Module({
  imports: [
    HttpModule,  
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
