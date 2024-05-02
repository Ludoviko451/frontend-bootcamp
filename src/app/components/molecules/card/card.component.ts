import { Component, Input } from '@angular/core';
import { TextComponent } from "../../atoms/text/text.component";

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [TextComponent]
})
export class CardComponent {

    @Input() title:string = '';

    @Input() description: string = '';
}
