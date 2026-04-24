import { Module } from '@nestjs/common';
import { Receipt } from './receipt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
  providers: [ReceiptsService],
  controllers: [ReceiptsController],
  exports: [TypeOrmModule],
})
export class ReceiptsModule {}
