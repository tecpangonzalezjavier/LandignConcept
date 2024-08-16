import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
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

  constructor(private modalController: ModalController) {
  }

  async openLoginModal(){
    const modal = await this.modalController.create({
      component: LoginModalComponent,
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
