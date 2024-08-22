import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {CategoryService} from "../../../services/category.service";
import {lastValueFrom} from "rxjs";


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
  loading: boolean = true
  categoriesError: boolean = false;

  constructor(private apiService: ApiService, protected categoryService: CategoryService) {
  }

  async ngOnInit() {
    try {
      const response = await lastValueFrom(this.apiService.get<CategoriaResponse>('Categorias'));
      if (!response.error && response.codigo === "EP000") {
        this.categories = response.menuItems.map((item: any) => ({
          idMenu: item.idMenu,
          descripcion: item['descripción'],
          active: false
        }));
        this.categoryService.setSelectedCategory(this.categories[0]);
        this.loading = false;
      } else {
        this.categoriesError = true;
        this.loading = false;
      }
    } catch (error) {
      this.categoriesError = true;
      this.categoryService.setSelectedCategory(null);
      this.loading = false;
    }
  }
}
