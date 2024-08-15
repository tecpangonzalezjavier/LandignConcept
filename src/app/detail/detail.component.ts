import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class DetailComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
