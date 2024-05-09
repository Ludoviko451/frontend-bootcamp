import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from "../../molecules/card/card.component";
import { TechnologyService } from '../../../api/technology.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../atoms/button/button.component";
import { ModalFormComponent } from "../../molecules/modal-form/modal-form.component";
import { SwitchService } from '../../../api/switch.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ITechnology } from '../../../shared/models/technology.interface';
import { AsyncPipe } from '@angular/common';
import { ModalMessageComponent } from '../../molecules/modal-message/modal-message.component';
import { PaginationComponent } from "../../molecules/pagination/pagination.component";
@Component({
    selector: 'app-technology',
    standalone: true,
    templateUrl: './technology.component.html',
    styleUrl: './technology.component.css',
    imports: [CardComponent, CommonModule, ButtonComponent, ModalFormComponent, AsyncPipe, ModalMessageComponent, PaginationComponent]
})
export class TechnologyComponent implements OnInit{

    constructor(private modalSS: SwitchService, private technologySvc: TechnologyService) {
    }

    public errorMessage = '';
    
    public technologyList$!: Observable<ITechnology[]>;

    showMessage:boolean = false;

    modalSwitch:boolean = false;

    type:string = "Tecnologia"

    technologyCreated: boolean = false ;
    
    isLoading = false;
    text:string = ""

    size: number = 10

    currentPage = 0

    numberOfPages = new Array(3);

    //Tenemos que escuchar el valor de nuestro observable

    ngOnInit(): void {
        //Metodo subscribe significa escuchar y obtener ese valor
        this.modalSS.$modal.subscribe((valor) => this.modalSwitch = valor);

        this.loadTechnologyList();

        this.modalSS.$created.subscribe((valor) => {
 
            if(valor === "success"){
                this.technologyCreated = true;
                this.text = "Tecnologia creada"
                this.loadTechnologyList()
            } else {
                this.technologyCreated = false;
                this.text = valor
            }
          });

    }

    getPaginationClass(page: number){
        if (this.currentPage == page){
            return "pagination-button pagination-button__active"
        } else {
            return "pagination-button"
        }
    }
    changeSize(event: Event){ 
        const target = event.target as HTMLSelectElement
        this.size = Number(target.value)
        this.technologySvc.changeSize(this.size)
        this.loadTechnologyList();
    }
    

    nextPage(){
        this.currentPage = this.currentPage + 1
        this.errorMessage = '';
        this.technologySvc.nextPage();
        this.loadTechnologyList();
    }
    changePage(page : number) {
        this.currentPage = page
        this.errorMessage = '';
        this.technologySvc.changePage(page)
        this.loadTechnologyList();
    }

    private loadTechnologyList(): void {
        this.technologyList$ = this.technologySvc.getTechnologies().pipe(
          catchError((error) => {
            this.errorMessage = error;
            return EMPTY;
          })
        );
      }
    
    openModal(): void{
        this.modalSwitch = true;
    }
}
