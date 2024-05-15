import { Component, Input } from '@angular/core';
import { TextComponent } from "../../atoms/text/text.component";
import { AtomsModule } from '../../atoms/atoms.module';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [AtomsModule]
})
export class CardComponent {

    @Input() title:string = '';

    @Input() description: string = '';
}
