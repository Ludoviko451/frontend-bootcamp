import { Component } from '@angular/core';
import { RouteImages } from '../../../util/route.images';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  route = RouteImages;
}
