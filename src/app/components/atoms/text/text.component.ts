import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {
  @Input() iconClass: string = '';
  @Input() text: string = '';
  @Input() textClass:string = 'text'
  @Input() className:string = 'text_container'
}
