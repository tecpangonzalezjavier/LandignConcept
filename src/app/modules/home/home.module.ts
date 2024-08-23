import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderComponent } from "./header/header.component";
import {TableComponent} from "./table/table.component";
import {MenuComponent} from "./menu/menu.component";
import {BrandComponent} from "./brand/brand.component";
import {DetailComponent} from "./detail/detail.component";
import {FooterComponent} from "./footer/footer.component";
import {MatIcon} from "@angular/material/icon";

import { DefaultImageDirective } from "../../directives/default-image.directive";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";

import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatSort} from "@angular/material/sort";
import { LoginModalComponent} from "./header/login-modal/login-modal.component";
import {MatButton} from "@angular/material/button";
import {SharedModule} from "../../shared/shared.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatIcon,
    TranslateModule,
    MatHeaderCell,
    MatCell,
    MatTable,
    MatHeaderRow,
    MatRow,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatSort,
    ReactiveFormsModule,
    MatButton,
    SharedModule
  ],
  declarations: [
    HomePage,
    HeaderComponent,
    TableComponent,
    MenuComponent,
    BrandComponent,
    DetailComponent,
    FooterComponent,
    LoginModalComponent,
    DefaultImageDirective
  ]
})
export class HomePageModule {}
