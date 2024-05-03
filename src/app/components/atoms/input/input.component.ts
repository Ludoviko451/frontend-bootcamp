import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextComponent } from "../text/text.component";
@Component({
    selector: 'app-input',
    standalone: true,
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
    imports: [FormsModule, TextComponent]
})
export class InputComponent {

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() text: string = '';

  @Output() valueChanged = new EventEmitter<string>();

  onInputChange(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit(value)
  }

}
