import { Component, OnInit } from '@angular/core';
import { CategoryService} from "../../../services/category.service";
import { ApiService } from "../../../services/api.service";
import {MenuItem} from "../menu/menu.component";
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

  constructor(private categoryService: CategoryService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.categoryService.selectedCategory$.subscribe((selectedCategory: MenuItem | null) => {
      if (selectedCategory) {
        this.fetchBrands(selectedCategory.idMenu);
      }
    });
  }

  fetchBrands(idMenu: number) {
    this.apiService.get('Marcas',{idMenu: idMenu}).subscribe(
      (response: any) => {
        if (!response.error && response.codigo === 'EP000') {
          this.brands = response.menuItems.map((item: any) => ({
            idItem: item.idItem,
            nombreMarca: item.nombreMarca,
            descripcion: item['descripción'], // Mapea 'descripción' a 'descripcion'
            imagen: item.imagen
          }));
          this.updateDisplayedBrands(); // Actualizar las marcas mostradas después de obtenerlas
        } else {
          console.error('Error fetching brands:', response);
        }
      },
      error => {
        console.error('HTTP Error:', error);
      }
    );
  }

  // Método para ordenar y mostrar las marcas
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

  // Métodos de control de la vista
  changeViewMode(mode: string): void {
    this.viewMode = mode;
  }

  changeSortBy(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortBy = selectElement.value;

    // Verificar si el valor es una clave válida de Brand
    if (['nombreMarca', 'descripcion'].includes(sortBy)) {
      this.sortBy = sortBy as keyof Brand;
      this.updateDisplayedBrands();
    } else {
      console.error(`Invalid sortBy value: ${sortBy}`);
    }
  }

  changeSortOrder(order: string): void {
    this.sortOrder = order;
    this.updateDisplayedBrands(); // Reordenar las marcas cuando cambia el orden
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.currentPage = 1; // Resetear a la primera página
    this.updateDisplayedBrands(); // Mostrar más marcas o menos marcas según la selección
  }

  // Cambia la página actual
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedBrands();
      this.scrollToTopOfBrands();  // Desplazar la vista hacia la parte superior de las marcas
    }
  }

  scrollToTopOfBrands(): void {
    const brandSection = document.querySelector('.brand-item');
    if (brandSection) {
      brandSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}


