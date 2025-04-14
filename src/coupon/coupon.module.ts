import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponAxiosRepository } from './repositories/coupon.repository-axios';
import { COUPON_REPOSITORY } from 'src/shared/utils/tokens';
import { CacheModule } from '@nestjs/cache-manager';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    SharedModule,
    CacheModule.register({
      ttl: 86400000 
    })
  ],
  controllers: [CouponController],
  providers: [ 
    CouponService,
    {
      provide: COUPON_REPOSITORY,
      useClass: CouponAxiosRepository,
    }
  ],
  exports: [CouponService],
})
export class CouponModule { }
