import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en'); // Idioma predeterminado
  currentLang$ = this.currentLang.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.currentLang.value);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLang.next(language);
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }
}
