import { Component, OnInit } from '@angular/core';
import {IonButton, IonCol, IonContent, IonRow} from "@ionic/angular/standalone";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {NgClass, NgForOf} from "@angular/common";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: true,
  imports: [
    IonCol,
    IonRow,
    MatButton,
    MatIcon,
    TranslateModule,
    IonContent,
    IonButton,
    NgClass,
    NgForOf
  ]
})
export class MenuComponent  implements OnInit {
  categories: any[] = [
    { name: 'Category 1', active: true },
    { name: 'Category 2', active: false },
    { name: 'Category 3', active: false },
    { name: 'Category 4', active: false },
  ];

  constructor() { }

  ngOnInit() {}

}
