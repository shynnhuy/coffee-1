import { map } from 'rxjs/operators';
import { ProductService } from './../../core/services/product.service';
import { AppProduct } from './../../core/models/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { NbTreeGridDataSource, NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'app-admin-list-products',
  templateUrl: './admin-list-products.component.html',
  styleUrls: ['./admin-list-products.component.scss']
})
export class AdminListProductsComponent implements OnInit {

  isLoading = true;

  defaultColumns = ['name', 'price', 'description'];
  actionsColumn = "actions";
  noColumn = "No."
  allColumns = [ ...this.defaultColumns, this.actionsColumn ];

  dataSources: NbTreeGridDataSource<AppProduct>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  data: TreeNode<AppProduct>[] = [];

  constructor(private productService: ProductService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<AppProduct>
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.data = [];
    this.productService.getProducts().pipe(map(val => {
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

}