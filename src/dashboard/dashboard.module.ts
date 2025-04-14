import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CouponModule } from 'src/coupon/coupon.module';
import { CategoryModule } from 'src/category/category.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [CouponModule, CategoryModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule { }