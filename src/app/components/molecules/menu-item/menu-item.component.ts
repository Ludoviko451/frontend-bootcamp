import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AtomsModule } from '../../atoms/atoms.module';
@Component({
    selector: 'app-menu-item',
    standalone: true,
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.css',
    imports: [AtomsModule, RouterLink]
})
export class MenuItemComponent {

  @Input() routerLink: string = ''
  @Input() text: string = ''
}
