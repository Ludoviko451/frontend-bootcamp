import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from "../../atoms/input/input.component";
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-modal-form',
    standalone: true,
    templateUrl: './modal-form.component.html',
    styleUrl: './modal-form.component.css',
    imports: [InputComponent, FormsModule]
})
export class ModalFormComponent {

    @Output() formSubmitted = new EventEmitter<any>();

    formData: any ={}

    submitForm (): void {
        this.formSubmitted.emit(this.formData);
    }

}
