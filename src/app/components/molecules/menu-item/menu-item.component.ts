import { Component, Input } from '@angular/core';
import { TextComponent } from "../../atoms/text/text.component";
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-menu-item',
    standalone: true,
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.css',
    imports: [TextComponent, RouterLink]
})
export class MenuItemComponent {

  @Input() routerLink: string = ''
  @Input() text: string = ''
}
