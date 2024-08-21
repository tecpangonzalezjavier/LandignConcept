import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";;
import {LoginModalComponent} from "./login-modal/login-modal.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
