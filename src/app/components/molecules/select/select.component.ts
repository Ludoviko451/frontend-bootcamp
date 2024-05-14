import { Observable} from 'rxjs';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ButtonComponent } from "../../atoms/button/button.component";
import { ITechnology } from '../../../shared/models/technology.interface';
import { TechnologyService } from '../../../api/technology.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-select',
    standalone: true,
    templateUrl: './select.component.html',
    styleUrl: './select.component.css',
    imports: [CommonModule, ButtonComponent]
})
export class SelectComponent  implements OnInit{

  dataContainer = "data-container--disabled"
  @Input() type: string = ""

  technologySvc = inject(TechnologyService);

  public technologyList$!: Observable<ITechnology[]>;
  ngOnInit(): void {
      this.technologyList$ = this.technologySvc.getTechnologies();
  }
  openSelect() {
  
    if(this.dataContainer == "data-container--disabled") {
      this.dataContainer = "data-container"
    } else {
      this.dataContainer = "data-container--disabled"
    }
  }
}
