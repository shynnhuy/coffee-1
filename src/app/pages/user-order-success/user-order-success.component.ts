import { OrderModel } from './../../core/models/order.model';
import { OrderService } from './../../core/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-order-success',
  templateUrl: './user-order-success.component.html',
  styleUrls: ['./user-order-success.component.scss']
})
export class UserOrderSuccessComponent implements OnInit, OnDestroy {

  orderId: string;
  order: OrderModel;
  orderSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((list: any) => {
      if (list.params['id']) {
        this.orderId = list.params['id'];
        this.orderSub = this.orderService.getOrderById(list.params['id']).subscribe(list => this.order = list);
      }
    });
  }

  ngOnDestroy(): void {
      this.orderSub.unsubscribe();
  }

}
