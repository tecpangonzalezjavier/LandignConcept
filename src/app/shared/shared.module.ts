import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from "./error/message.component";
import {SpinnerComponent} from "./load-spinner/spinner.component";

@NgModule({
  declarations: [ErrorMessageComponent, SpinnerComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorMessageComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
