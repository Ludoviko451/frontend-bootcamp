import { Response } from './../../../shared/models/response';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
import { TextComponent } from "../../atoms/text/text.component";
import { SizeChangerComponent } from "../../molecules/size-changer/size-changer.component";
@Component({
    selector: 'app-technology',
    standalone: true,
    templateUrl: './technology.component.html',
    styleUrl: './technology.component.css',
    imports: [CardComponent, CommonModule, ButtonComponent, ModalFormComponent, AsyncPipe, ModalMessageComponent, PaginationComponent, TextComponent, SizeChangerComponent]
})
export class TechnologyComponent implements OnInit, OnDestroy{

    constructor(private modalSS: SwitchService, private technologySvc: TechnologyService) {
    }


    
    public technologyList$!: Observable<ITechnology[]>;

    showMessage:boolean = false;

    modalSwitch:boolean = false;

    
    text:string = ""

    size: number = 10

    currentPage = 0

    asc: string = "Asc 🡩"
  
    desc: string = "Desc 🡫"
  
    order: string = this.desc;
    numberOfPages = new Array(3);

    
    options = [
        { value: '10', label: '10 - por página' },
        { value: '20', label: '20 - por página' },
        { value: '50', label: '50 - por página' }
      ];

      postResponse:Response = {} as Response;


      errorMessage:Response = {} as Response;


    //Tenemos que escuchar el valor de nuestro observable

    ngOnInit(): void {
        //Metodo subscribe significa escuchar y obtener ese valor
        this.modalSS.$modal.subscribe((valor) => this.modalSwitch = valor);
        this.modalSS.$postTechnology.subscribe((postResponse) => {
            this.text = '';
            this.postResponse = {} as Response;
            
            this.postResponse = postResponse;
            this.text = postResponse.message;
          });
      

        this.loadTechnologyList();
    }

    changeOrder(){
        if(this.order === this.desc){
            this.order = this.asc;
        } else {
            this.order = this.desc;
        }
        this.technologySvc.changeOrder();
        this.loadTechnologyList();
    }

    getPaginationClass(page: number){
        if (this.currentPage == page){
            return "pagination-button pagination-button__active"
        } else {
            return "pagination-button"
        }
    }
    onSizeChanged(size: number){ 
        this.size = size;
        this.technologySvc.changeSize(size);
        this.loadTechnologyList()
    }
    
    onPageChanged(pageNumber: number): void {
        console.log(this.errorMessage.status)
        if (this.errorMessage.status === 0 || this.errorMessage.status === 404) {
            this.currentPage--;
        } else {
            this.currentPage = pageNumber;
        }

        this.technologySvc.page = this.currentPage
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

    ngOnDestroy(): void {
        // Cancelar la suscripción para evitar fugas de memoria
        this.modalSS.$postTechnology.unsubscribe();
      }
}
