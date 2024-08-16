import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol} from '@ionic/angular/standalone';
import { HeaderComponent} from "../header/header.component";
import {TableComponent} from "../table/table.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MenuComponent} from "../menu/menu.component";
import {BrandComponent} from "../brand/brand.component";
import {DetailComponent} from "../detail/detail.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, HeaderComponent, TableComponent, IonRow, IonCol, MatButton, MatIcon, MenuComponent, BrandComponent, DetailComponent, FooterComponent],
})
export class HomePage {
  constructor() {}
}
