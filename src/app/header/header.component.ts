import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LanguageService } from "../services/language.service";
import {LoginModalComponent} from "./login-modal/login-modal.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    MatButton,
    MatIconModule,
    TranslateModule,
  ]
})
export class HeaderComponent  implements OnInit {

  constructor(private translate: TranslateService, private languageService: LanguageService, private modalController: ModalController) {
    this.translate.setDefaultLang('en');
  }

  async openLoginModal(){
    const modal = await this.modalController.create({
      component: LoginModalComponent,
    });
    return await modal.present();
  }

  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);
  }
  ngOnInit() {
    this.languageService.currentLang$.subscribe((language)=>{
      this.translate.use(language);
    })
  }

}
