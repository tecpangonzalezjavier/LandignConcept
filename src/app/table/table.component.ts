import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatSort} from "@angular/material/sort";
import {IonRow} from "@ionic/angular/standalone";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    NgIf,
    MatSort,
    MatHeaderRowDef,
    MatRowDef,
    IonRow
  ]
})
export class TableComponent {
  displayedColumns: string[] = ['feature', 'product1', 'product2'];
  dataSource = [
    { feature: 'INSTANT_COUPONS', product1: true, product2: true },
    { feature: 'FULL_ACCESS_VISA', product1: false, product2: true },
    { feature: 'CASHBACK_TRACKING', product1: false, product2: true },
    { feature: 'MERCHANT_LOCATION_SEARCH', product1: false, product2: true },
    { feature: 'CASHBACK_OFFERS', product1: false, product2: true }
  ];


  constructor() { }

}
