import { Component, OnInit } from '@angular/core';
import { ApiService} from "../../../services/api.service";
import { CategoryService} from "../../../services/category.service";

export interface MenuItem {
  descripcion: string;
  idMenu: number;
  active: boolean;
}

export interface CategoriaResponse {
  error: boolean;
  codigo: string;
  message: string;
  menuItems: MenuItem[];
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  categories: { descripcion: string; idMenu: number; active: boolean }[] = [];

  constructor(private apiService: ApiService, protected categoryService: CategoryService) { }

  ngOnInit() {
    this.apiService.get<CategoriaResponse>('Categorias')
      .subscribe(
        (response) => {
          if (!response.error && response.codigo === "EP000") {
            this.categories = response.menuItems.map((item:any) => ({
              idMenu: item.idMenu,
              descripcion: item['descripción'],
              active: false
            }));
            this.categoryService.setSelectedCategory(this.categories[0])
          } else {
            console.error('Error fetching categories:', response.message);
          }
        },
        (error) => {
          console.error('HTTP Error:', error);
        }
      );
  }

  selectCategory(category: MenuItem) {
    this.categories.forEach(cat => cat.active = false); // Desactivar todas las categorías
    category.active = true; // Activar la categoría seleccionada
  }
}
