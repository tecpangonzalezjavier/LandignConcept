import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from "../../../../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  loginForm: FormGroup;

  constructor(private modalController: ModalController, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  dismissModal() {
    this.login();
    this.modalController.dismiss();
  }

  login(){
    const token = 'example-token-from-api';
    this.authService.login(token);
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.dismissModal();
    }
  }
}
