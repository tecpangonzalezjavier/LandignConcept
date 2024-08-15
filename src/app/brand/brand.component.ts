import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
export interface Brand {
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgClass,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    MatIcon
  ]
})
export class BrandComponent  implements OnInit {
  brands: Brand[] = [];
  displayedBrands: Brand[] = [];
  itemsPerPage: number = 7;
  showAll: boolean = false;
  viewMode: 'mosaic' | 'gallery' = 'mosaic';
  sortOrder: 'asc' | 'desc' = 'asc';
  sortBy: 'name' | 'description' = 'name';

  constructor() {
    this.brands = this.loadBrands();
    this.updateDisplayedBrands();
    console.log(this.displayedBrands)
  }

  loadBrands(): Brand[] {
    // Aquí iría la lógica para cargar las marcas (puede ser desde un API)
    return [
      { name: 'Brand A', description: 'Description A', imageUrl: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png' },
      { name: 'Brand B', description: 'Description B', imageUrl: 'urlB' },
      { name: 'Brand C', description: 'Description C', imageUrl: 'urlC' },
      { name: 'Brand D', description: 'Description D', imageUrl: 'urlD' },
      { name: 'Brand E', description: 'Description E', imageUrl: 'urlE' },
      { name: 'Brand F', description: 'Description F', imageUrl: 'urlF' },
      { name: 'Brand G', description: 'Description G', imageUrl: 'urlG' },
      { name: 'Brand H', description: 'Description H', imageUrl: 'urlH' },
      // Más marcas
    ];
  }

  updateDisplayedBrands() {
    const sortedBrands = this.brands.sort((a, b) => {
      const valueA = a[this.sortBy].toLowerCase();
      const valueB = b[this.sortBy].toLowerCase();
      if (this.sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    this.displayedBrands = this.showAll ? sortedBrands : sortedBrands.slice(0, this.itemsPerPage);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.updateDisplayedBrands();
  }

  changeViewMode(mode: 'mosaic' | 'gallery') {
    this.viewMode = mode;
  }

  changeSortOrder(order: 'asc' | 'desc') {
    this.sortOrder = order;
    this.updateDisplayedBrands();
  }

  changeSortBy(criteria: 'name' | 'description') {
    this.sortBy = criteria;
    this.updateDisplayedBrands();
  }



  ngOnInit() {}

}
