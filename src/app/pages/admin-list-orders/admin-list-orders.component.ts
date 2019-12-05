import { UserService } from 'src/app/core/services/user.service';
import { OrderService } from './../../core/services/order.service';
import { OrderModel } from './../../core/models/order.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbTreeGridDataSource, NbSortDirection, NbSortRequest, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { TreeNode } from 'src/app/core/models/treenode.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-list-orders',
  templateUrl: './admin-list-orders.component.html',
  styleUrls: ['./admin-list-orders.component.scss']
})
export class AdminListOrdersComponent implements OnInit, OnDestroy {

  isLoading = true;

  data: TreeNode<OrderModel>[] = [];
  dataSources: NbTreeGridDataSource<OrderModel>;

  userIdColumn = 'userId';
  datePlacedColumn = "datePlaced";
  statusColumn = "status"
  actionsColumn = "actions";
  allColumns = [this.userIdColumn, this.datePlacedColumn, this.statusColumn, this.actionsColumn];


  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  userSub: Subscription;
  userName;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<OrderModel>
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.data = [];
    this.orderService.getOrder().pipe(map(val => {
      val.map(v => {
        this.data.push({
          data: v
        })

      })
    })).subscribe(list => {
      console.log(this.data);

      this.dataSources = this.dataSourceBuilder.create(this.data)
      this.isLoading = false;
    })
  }

  changeSort(sortRequest: NbSortRequest): void {
    this.dataSources.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getDate(number) {
    const date = new Date(number);
    return date.toLocaleDateString();
  }

  getUserName(uid) {
    this.userSub = this.userService.getUserById(uid).subscribe(user => {
      this.userName = user.name;
    })
    return this.userName;
    // return this.userService.getUserById(uid);
  }

  changeStatus(orderId, status: string) {
    let newStatus;
    if (status == 'pending') {
      newStatus = 'approve'
    }
    this.orderService.changeStatus(orderId, newStatus);
    this.init();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
