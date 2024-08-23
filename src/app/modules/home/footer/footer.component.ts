import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { LanguageService } from "../../../../services/language.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {
  languages: any = {
    'en': true,
    'es': false,
    'fr': false,
    'de': false,
  }

  constructor(private translate: TranslateService, private languageService: LanguageService) {
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);

    Object.keys(this.languages).forEach(key => {
      this.languages[key] = false;
    });

    this.languages[language] = true;
  }

  ngOnInit() {
    this.languageService.currentLang$.subscribe((language)=>{
      this.translate.use(language);
    })
  }

}
