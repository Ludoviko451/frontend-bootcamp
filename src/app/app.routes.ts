import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { HomeComponent } from "./components/pages/home/home.component";
import { LibraryComponent } from "./components/pages/library/library.component";
import { TechnologyComponent } from './components/pages/technology/technology.component';
import { CapacityComponent } from "./components/pages/capacity/capacity.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'library',
    component: LibraryComponent,
    children: [
      { path: '', redirectTo: 'technology', pathMatch: 'full' }, // Redirección a /library/technology por defecto
      { path: 'technology', component: TechnologyComponent },
      {path: 'capacity', component: CapacityComponent}
    ]
  },
  { 
    path: '**', // Ruta por defecto para cualquier otra URL
    redirectTo: '/home' // Redireccionar a /home si la URL no coincide con ninguna de las rutas definidas
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
