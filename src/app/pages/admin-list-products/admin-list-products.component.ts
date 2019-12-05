import { TreeNode } from './../../core/models/treenode.model';
import { map } from 'rxjs/operators';
import { ProductService } from './../../core/services/product.service';
import { AppProduct } from './../../core/models/product.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbTreeGridDataSource, NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-list-products',
  templateUrl: './admin-list-products.component.html',
  styleUrls: ['./admin-list-products.component.scss']
})
export class AdminListProductsComponent implements OnInit, OnDestroy {

  isLoading = true;

  productSub: Subscription;

  defaultColumns = ['name', 'price', 'description'];
  actionsColumn = "actions";
  noColumn = "No."
  allColumns = [ ...this.defaultColumns, this.actionsColumn ];

  dataSources: NbTreeGridDataSource<AppProduct>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  data: TreeNode<AppProduct>[] = [];

  constructor(
    private productService: ProductService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<AppProduct>
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.data = [];
    this.productSub = this.productService.getProducts().pipe(map(val => {
      val.map(v => {
        this.data.push({
          data: v
        })
      })
    })).subscribe(list => {
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

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

}