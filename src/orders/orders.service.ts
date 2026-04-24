import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => NotificationsService))
    private readonly notifications: NotificationsService,
  ) {}

  createOrder(orderDto: any) {
    this.notifications.notify('order_created', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      order: orderDto,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { status: 'Order accepted', order: orderDto };
  }
}
