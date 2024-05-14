import { TechnologyService } from './../../../api/technology.service';
import { ITechnologyRequest } from './../../../shared/models/technology.request';
import { ITechnology } from './../../../shared/models/technology.interface';
import { Component, Input, OnInit, inject} from '@angular/core';
import { InputComponent } from "../../atoms/input/input.component";
import { FormControl, FormGroup, FormsModule, NgForm, FormBuilder } from '@angular/forms';
import { SwitchService } from '../../../api/switch.service';
import { ButtonComponent } from "../../atoms/button/button.component";
import { TextComponent } from "../../atoms/text/text.component";
import { ReactiveFormsModule} from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable, catchError } from 'rxjs';
import { SelectComponent } from "../select/select.component";

@Component({
    selector: 'app-modal-form',
    standalone: true,
    templateUrl: './modal-form.component.html',
    styleUrl: './modal-form.component.css',
    imports: [InputComponent, FormsModule, ButtonComponent, TextComponent, ReactiveFormsModule, NgIf, AsyncPipe, SelectComponent]
})
export class ModalFormComponent implements OnInit {

    constructor(private modalSS: SwitchService, private fb: FormBuilder) {
    }

    technologySvc = inject(TechnologyService);

    public technologyList$!: Observable<ITechnology[]>;
    ngOnInit(): void {
        this.technologyList$ = this.technologySvc.getTechnologies().pipe(
            catchError((err) => {
                return EMPTY
            })
        )

        console.log(this.technologyList$)
    }

    
    @Input () type: string = ""

    get name(){
        return this.formCreate.get('name') as FormControl;
    }

    get description(){
        return this.formCreate.get('description') as FormControl;
    }

    formCreate = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(90)]]
        
    })




    closeModal() : void {

        if (this.type == "Capacidad"){
            this.modalSS.$modalCapacity.emit(false);
        }
        this.modalSS.$modal.next(false);
    }


    newTechnology:ITechnologyRequest = {} as ITechnologyRequest


    onSubmit(){
        this.newTechnology.name = this.formCreate.value.name
        this.newTechnology.description = this.formCreate.value.description

        this.technologySvc.postTechnology(this.newTechnology)

        console.log(this.formCreate.value);
        this.formCreate.reset();

        //Agregar mensaje de creado
        this.modalSS.$modalMessage.emit(true)
        this.modalSS.$modal.emit(false)
    }

}
