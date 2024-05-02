import { Component, HostListener } from '@angular/core';
import { ButtonComponent } from "../../atoms/button/button.component";
import { Router, RouterModule } from '@angular/router';
import { TextComponent } from "../../atoms/text/text.component";
import {RouteImages} from "../../../util/route.images";
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [ButtonComponent, TextComponent, CommonModule, RouterModule]
})
export class NavbarComponent {
    route = RouteImages;
    isMobile: boolean = false;
    showMenu: boolean = false;

    constructor(private router: Router) {
        this.checkScreenWidth();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.checkScreenWidth();
    }

    checkScreenWidth() {
        this.isMobile = window.innerWidth <= 768;
        // Si es móvil y el menú está oculto, asegurar que el botón de menú sea visible
        if (this.isMobile && !this.showMenu) {
            this.showMenu = false; // Forzar el menú a estar oculto en pantallas móviles
        }
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }

    onNavigate(route: string) {
        this.router.navigateByUrl(route);
        if (this.isMobile) {
            this.showMenu = false; // Ocultar automáticamente el menú después de la navegación en pantallas móviles
        }
    }
}