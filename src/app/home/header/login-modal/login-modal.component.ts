import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login-modal',
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
      this.dismissModal();
    }
  }
}
