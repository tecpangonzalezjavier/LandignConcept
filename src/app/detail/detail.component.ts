import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { MatIcon } from "@angular/material/icon";
import { NgForOf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatButton } from "@angular/material/button";
import { ApiService } from '../../services/api.service';  // Importar el servicio API
import { CategoryService } from '../../services/category.service';  // Importar el servicio de categorías
import { Brand } from "../brand/brand.component";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    MatIcon,
    NgForOf,
    TranslateModule,
    MatButton,
  ]
})
export class DetailComponent implements OnInit {
  brands: any[] = []; // Arreglo para almacenar las marcas obtenidas del API

  constructor(private apiService: ApiService, private categoryService: CategoryService) {}

  ngOnInit() {
    // Escuchar cambios en la categoría seleccionada
    this.categoryService.selectedCategory$.subscribe(selectedCategory => {
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
          })).slice(0,4);
        } else {
          console.error('Error fetching brands:', response.message);
        }
      },
      error => {
        console.error('HTTP Error:', error);
      }
    );
  }
}
