import { Component, OnInit } from '@angular/core';
import { ApiService} from "../../../services/api.service";// Importar el servicio API
import { CategoryService} from "../../../services/category.service";  // Importar el servicio de categorías


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
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
