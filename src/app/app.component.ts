import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/molecules/navbar/navbar.component";
import { HeaderComponent } from "./components/atoms/header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, HeaderComponent, HttpClientModule, FormsModule]
})
export class AppComponent {
  title = 'frontend-bootcamp';

}
