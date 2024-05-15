import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { AtomsModule } from '../../atoms/atoms.module';
@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    imports: [AtomsModule, RouterModule, MenuItemComponent]
})
export class MenuComponent {

    info = [
        {
            name: "Tecnologías",
            url: "/library/technology"
        },
        {
            name: "Capacidades",
            url: "/library/capacity"
        },
        {
            name: "Bootcamps",
            url: "/library/bootcamp"
        }
    ]
}
