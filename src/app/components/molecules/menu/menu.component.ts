import { Component } from '@angular/core';
import { TextComponent } from "../../atoms/text/text.component";
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from "../menu-item/menu-item.component";
@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    imports: [TextComponent, RouterModule, MenuItemComponent]
})
export class MenuComponent {

    info = [
        {
            name: "Technology",
            url: "/library/technology"
        },
        {
            name: "Capacity",
            url: "/library/capacity"
        },
        {
            name: "Bootcamp",
            url: "/library/bootcamp"
        }
    ]
}
