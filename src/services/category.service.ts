import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from "../app/menu/menu.component";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategorySubject: BehaviorSubject<MenuItem | null> = new BehaviorSubject<MenuItem | null>(null);

  selectedCategory$: Observable<MenuItem | null> = this.selectedCategorySubject.asObservable();

  setSelectedCategory(category: MenuItem): void {
    this.selectedCategorySubject.next(category);
  }

  getSelectedCategory(): MenuItem | null {
    return this.selectedCategorySubject.value;
  }
}
