import { Component, OnInit } from '@angular/core';
import { ApiService} from "../../../../services/api.service";
import { CategoryService} from "../../../../services/category.service";
import {combineLatest, filter, firstValueFrom, lastValueFrom} from "rxjs";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  brands: any[] = [];
  detailsError: boolean = false;
  loading: boolean = true;

  constructor(private apiService: ApiService, private categoryService: CategoryService) {}

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
        this.detailsError = true;
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
        })).slice(0, 4);
        this.loading = false;
      } else {
        this.detailsError = true;
        console.error('Error fetching brands:', response);
      }
    } catch (error) {
      this.detailsError = true;
      this.loading = false;
      console.error('HTTP Error:', error);
    }
  }
}
