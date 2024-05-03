import { TechnologyService } from './../../../api/technology.service';
import { ITechnologyRequest } from './../../../shared/models/technology.request';
import { ITechnology } from './../../../shared/models/technology.interface';
import { Component, EventEmitter, Output, inject} from '@angular/core';
import { InputComponent } from "../../atoms/input/input.component";
import { FormsModule, NgForm } from '@angular/forms';
import { SwitchService } from '../../../api/switch.service';
import { ButtonComponent } from "../../atoms/button/button.component";
import { TextComponent } from "../../atoms/text/text.component";
import { ReactiveFormsModule} from '@angular/forms';
@Component({
    selector: 'app-modal-form',
    standalone: true,
    templateUrl: './modal-form.component.html',
    styleUrl: './modal-form.component.css',
    imports: [InputComponent, FormsModule, ButtonComponent, TextComponent, ReactiveFormsModule]
})
export class ModalFormComponent {

    constructor(private modalSS: SwitchService) {
        
    }

    tecnologia:ITechnologyRequest = {
        name: '',
        description: ''
    }

    type: string = "Tecnologia"



    closeModal() : void {
        this.modalSS.$modal.emit(false);
    }

    onNameChange(value: string) : void {
        this.tecnologia.name = value
    }

    onDescriptionChange(value: string) : void {
        this.tecnologia.description = value
    }
    
    technologySvc = inject(TechnologyService);

    onSubmit(){

        console.log(this.tecnologia)
        this.technologySvc.postTechnology(this.tecnologia)
    }



}
