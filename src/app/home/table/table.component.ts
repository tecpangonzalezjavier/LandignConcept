import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
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
