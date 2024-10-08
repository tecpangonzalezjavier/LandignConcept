import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
