import { Component, OnInit } from '@angular/core';
import { CategoryService} from "../../../services/category.service";
import { ApiService } from "../../../services/api.service";
import {combineLatest, filter, lastValueFrom} from "rxjs";
export interface Brand {
  idItem: number;
  nombreMarca: string;
  descripcion: string;
  imagen: string;
}
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  displayedBrands: Brand[] = [];
  viewMode = 'mosaic';
  sortOrder = 'asc';
  sortBy: keyof Brand = 'nombreMarca';
  showAll = false;
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 1;
  initialItems = 7;
  brandError = true;
  loading: boolean = true;

  constructor(private categoryService: CategoryService, private apiService: ApiService) {}

  ngOnInit(): void {
    combineLatest([
      this.categoryService.initializationComplete$,
      this.categoryService.selectedCategory$
    ]).pipe(
      filter(([isInitialized, selectedCategory]) => isInitialized && !!selectedCategory)
    ).subscribe(([_, selectedCategory]) => {
      if (selectedCategory) {
        this.fetchBrands(selectedCategory.idMenu);
      } else {
        this.brandError = true;
        this.loading = false;
      }
    });

  }

  async fetchBrands(idMenu: number) {
    try {
      const response: any = await lastValueFrom(this.apiService.get('Marcas', { idMenu: idMenu }));

      if (!response.error && response.codigo === 'EP000') {
        this.brands = response.menuItems.map((item: any) => ({
          idItem: item.idItem,
          nombreMarca: item.nombreMarca,
          descripcion: item['descripción'],
          imagen: item.imagen
        }));
        this.updateDisplayedBrands();
        this.loading = false;
        this.brandError = false;
      } else {
        this.brandError = true;
        console.error('Error fetching brands:', response);
      }
    } catch (error) {
      this.brandError = true;
      console.error('HTTP Error:', error);
    }
  }

  updateDisplayedBrands() {
    const sortedBrands = this.brands.sort((a, b) => {
      const valueA = String(a[this.sortBy]).toLowerCase();
      const valueB = String(b[this.sortBy]).toLowerCase();
      if (this.sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    if (this.showAll) {
      this.totalPages = Math.ceil(sortedBrands.length / this.itemsPerPage);
      this.displayedBrands = sortedBrands.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    } else {
      this.displayedBrands = sortedBrands.slice(0, this.initialItems);
    }
  }

  changeViewMode(mode: string): void {
    this.viewMode = mode;
  }

  changeSortBy(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortBy = selectElement.value;

    if (['nombreMarca', 'descripcion'].includes(sortBy)) {
      this.sortBy = sortBy as keyof Brand;
      this.updateDisplayedBrands();
    } else {
      console.error(`Invalid sortBy value: ${sortBy}`);
    }
  }

  changeSortOrder(order: string): void {
    this.sortOrder = order;
    this.updateDisplayedBrands();
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.currentPage = 1;
    this.updateDisplayedBrands();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedBrands();
      this.scrollToTopOfBrands();
    }
  }

  scrollToTopOfBrands(): void {
    const brandSection = document.querySelector('.brand-item');
    if (brandSection) {
      brandSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}


