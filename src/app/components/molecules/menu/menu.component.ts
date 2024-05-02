import { Component } from '@angular/core';
import { TextComponent } from "../../atoms/text/text.component";
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    imports: [TextComponent, RouterModule]
})
export class MenuComponent {

}
