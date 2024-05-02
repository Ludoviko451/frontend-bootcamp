import { Component } from '@angular/core';
import { MenuComponent } from "../../molecules/menu/menu.component";
import { RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-library',
    standalone: true,
    templateUrl: './library.component.html',
    styleUrl: './library.component.css',
    imports: [MenuComponent, RouterOutlet]
})
export class LibraryComponent {

}
