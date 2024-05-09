import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../../atoms/button/button.component";

@Component({
    selector: 'app-pagination',
    standalone: true,
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css',
    imports: [ButtonComponent]
})
export class PaginationComponent {

  @Input() event = () => {}
  totalPages = {
    1: '1',
    2: '2',
    3: '3',
  };



}
