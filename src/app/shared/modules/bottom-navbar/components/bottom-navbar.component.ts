import {Component} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'wal-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.css']
})
export class BottomNavbarComponent {
  links = ['Home', 'Ingresos', 'Egresos'];
  activeLink = this.links[0];
  background: ThemePalette = "primary";
}
