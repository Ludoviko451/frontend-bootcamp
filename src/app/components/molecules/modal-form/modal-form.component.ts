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
import { AtomsModule } from '../../atoms/atoms.module';
import { ICapacityRequest } from '../../../shared/models/capacity.request';
import { CapacityService } from '../../../api/capacity.service';

@Component({
    selector: 'app-modal-form',
    standalone: true,
    templateUrl: './modal-form.component.html',
    styleUrl: './modal-form.component.css',
    imports: [InputComponent, FormsModule, AtomsModule, ReactiveFormsModule, NgIf, AsyncPipe, SelectComponent]
})
export class ModalFormComponent implements OnInit {

    constructor(private modalSS: SwitchService, private fb: FormBuilder) {
    }

    technologySvc = inject(TechnologyService);
    
    capacitySvc = inject(CapacityService);
    public technologies:ITechnology[] = []
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

    get technologiesForm(){
        return this.formCreate.get('technologiesForm') as FormControl;
    }

    formCreate = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.maxLength(90)]],
        technologiesForm: [this.technologies, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
        
    })




    closeModal() : void {

        if (this.type == "Capacidad"){
            this.modalSS.$modalCapacity.emit(false);
        }
        this.modalSS.$modal.next(false);
    }


    newTechnology:ITechnologyRequest = {} as ITechnologyRequest
    newCapacity:ICapacityRequest = {} as ICapacityRequest

    onSubmit(){
        if(this.type == "Capacidad"){
            this.newCapacity.name = this.formCreate.value.name
            this.newCapacity.description = this.formCreate.value.description
            this.newCapacity.technologyList = this.technologies

            console.log(this.newCapacity)
            this.capacitySvc.postCapacity(this.newCapacity)
            this.formCreate.reset()
        }
        // this.newTechnology.name = this.formCreate.value.name
        // this.newTechnology.description = this.formCreate.value.description
        // this.technologySvc.postTechnology(this.newTechnology)

        // console.log(this.formCreate.value);
        // this.formCreate.reset();

        // //Agregar mensaje de creado
        this.modalSS.$modalMessage.emit(true)
        this.modalSS.$modal.emit(false)
    }

    onTechnologyListChanged(technologies: ITechnology[]): void {
        this.technologies = technologies ?? [];  // Use empty array if technologies is nullish
        this.formCreate.get('technologiesForm')?.setValue(this.technologies);
      }
}
