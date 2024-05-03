import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from "../../molecules/card/card.component";
import { TechnologyService } from '../../../api/technology.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../atoms/button/button.component";
import { ModalFormComponent } from "../../molecules/modal-form/modal-form.component";
import { SwitchService } from '../../../api/switch.service';

@Component({
    selector: 'app-technology',
    standalone: true,
    templateUrl: './technology.component.html',
    styleUrl: './technology.component.css',
    imports: [CardComponent, CommonModule, ButtonComponent, ModalFormComponent]
})
export class TechnologyComponent implements OnInit{

    constructor(private modalSS: SwitchService) {
        
    }

    
    modalSwitch:boolean = false;

        //Tenemos que escuchar el valor de nuestro observable

    ngOnInit(): void {
        //Metodo subscribe significa escuchar y obtener ese valor
        this.modalSS.$modal.subscribe((valor) => this.modalSwitch = valor);
    }

    
    openModal(): void{
        this.modalSwitch = true;
    }
    private readonly technologySvc = inject(TechnologyService);
    technologys = this.technologySvc.technologys;

    nextPage(): void{
        this.technologySvc.nextPage();
        this.technologySvc.getTechnologys();
    }

    
    previousPage(): void{
        this.technologySvc.previousPage();
        this.technologySvc.getTechnologys();
    }
    


}
