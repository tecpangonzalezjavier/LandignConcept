import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from "../app/home/menu/menu.component";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private initializationCompleteSubject = new BehaviorSubject<boolean>(false);
  public initializationComplete$ = this.initializationCompleteSubject.asObservable();

  private selectedCategorySubject: BehaviorSubject<MenuItem | null> = new BehaviorSubject<MenuItem | null>(null);
  selectedCategory$: Observable<MenuItem | null> = this.selectedCategorySubject.asObservable();

  constructor() {
    setTimeout(() => {
      this.initializationCompleteSubject.next(true);
    }, 1000);
  }

  setSelectedCategory(category: MenuItem | null): void {
    this.selectedCategorySubject.next(category);
  }

  getSelectedCategory(): MenuItem | null {
    return this.selectedCategorySubject.value;
  }
}
