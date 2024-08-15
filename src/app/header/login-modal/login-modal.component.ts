import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    MatButton,
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  loginForm: FormGroup;

  constructor(private modalController: ModalController, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('User:', username, 'Password:', password);
      this.dismissModal();
    }
  }
}
