import { Module } from '@nestjs/common';
import { Receipt } from './receipt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  providers: [ReceiptsService],
  controllers: [ReceiptsController],
  exports: [TypeOrmModule],
})
export class ReceiptsModule {}
