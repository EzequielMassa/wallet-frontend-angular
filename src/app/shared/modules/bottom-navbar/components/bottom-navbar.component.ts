import {Component} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {slideInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'wal-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.css'],
  animations: [slideInUpOnEnterAnimation()]
})
export class BottomNavbarComponent {
  links = ['Home', 'Ingresos', 'Egresos'];
  activeLink = this.links[0];
  background: ThemePalette = "primary";
}
