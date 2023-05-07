import {Component} from '@angular/core';
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'wal-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {
  links = ['Home', 'Ingresos', 'Egresos'];
  activeLink = this.links[0];
  background: ThemePalette = "primary";

}
