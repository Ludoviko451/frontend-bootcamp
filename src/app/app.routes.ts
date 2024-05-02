import { TechnologyComponent } from './components/pages/technology/technology.component';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/pages/home/home.component";
import { LibraryComponent } from "./components/pages/library/library.component";
import { NgModule } from "@angular/core";
export const routes: Routes = [
        {
                path: 'home',
                component: HomeComponent
        },
        {
                path: 'library',
                component: LibraryComponent,
                children: [
                        {path: 'technology', component: TechnologyComponent }
                ]
        }
]

@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
})
export class AppRoutingModule{}