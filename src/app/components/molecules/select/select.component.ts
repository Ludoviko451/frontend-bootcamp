import { ITechnology } from './../../../shared/models/technology.interface';
import { Observable} from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TechnologyService } from '../../../api/technology.service';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../../atoms/atoms.module';

@Component({
    selector: 'app-select',
    standalone: true,
    templateUrl: './select.component.html',
    styleUrl: './select.component.css',
    imports: [CommonModule, AtomsModule]
})
export class SelectComponent  implements OnInit{

  dataContainer = "data-container--disabled"
  @Input() type: string = ""

  @Output() technologyListChanged = new EventEmitter<ITechnology[]>()
  technologys: ITechnology[] = []
  technologySvc = inject(TechnologyService);

  public technologyList$!: Observable<ITechnology[]>;
  ngOnInit(): void {
      this.technologySvc.changeSize(100);
      this.technologyList$ = this.technologySvc.getTechnologies();
  }

  addElement(tech: ITechnology) {

    if(this.technologys.includes(tech)) {
      console.log("No se pueden agregar tecnologias repetidas")
    } else {
      this.technologys.push(tech)
      this.technologyListChanged.emit(this.technologys)
    }
    console.log(this.technologys)
  }
  openSelect() {
    if(this.dataContainer == "data-container--disabled") {
      this.dataContainer = "data-container"
    } else {
      this.dataContainer = "data-container--disabled"
    }
  }
}
