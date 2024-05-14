import { Component, OnInit } from '@angular/core';
import { ICapacity } from '../../../shared/models/capacity.interface';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { CapacityService } from '../../../api/capacity.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CardComponent } from "../../molecules/card/card.component";
import { TextComponent } from "../../atoms/text/text.component";
import { SizeChangerComponent } from "../../molecules/size-changer/size-changer.component";
import { ModalMessageComponent } from "../../molecules/modal-message/modal-message.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { PaginationComponent } from "../../molecules/pagination/pagination.component";
import { ModalFormComponent } from "../../molecules/modal-form/modal-form.component";
import { Response } from '../../../shared/models/response';
import { SwitchService } from '../../../api/switch.service';
@Component({
    selector: 'app-capacity',
    standalone: true,
    templateUrl: './capacity.component.html',
    styleUrl: './capacity.component.css',
    imports: [CommonModule, AsyncPipe, CardComponent, TextComponent, SizeChangerComponent, ModalMessageComponent, ButtonComponent, PaginationComponent, ModalFormComponent]
})
  export class CapacityComponent implements OnInit {

  constructor(private capacitySvc: CapacityService, private modalSS: SwitchService) {}
  public capacityList$!: Observable<ICapacity[]>;
  

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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.modalSS.$modalCapacity.subscribe((valor) => this.modalSwitch = valor);
    this.loadCapacityList();
    
  }

  changeOrder(){

    if(this.order === this.desc){
        this.order = this.asc;
    } else {
        this.order = this.desc;
    }
    this.capacitySvc.changeOrder();
    this.loadCapacityList();
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
    this.capacitySvc.changeSize(size);
    this.loadCapacityList();
}

onPageChanged(pageNumber: number): void {
    console.log(this.errorMessage.status)
    if (this.errorMessage.status === 0 || this.errorMessage.status === 404) {
        this.currentPage--;
    } else {
        this.currentPage = pageNumber;
    }

    this.capacitySvc.changePage(this.currentPage);
    this.loadCapacityList();
  }

  private loadCapacityList(): void {
    this.capacityList$ = this.capacitySvc.getCapacities().pipe(
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
