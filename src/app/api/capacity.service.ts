import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ITechnology } from '../shared/models/technology.interface';
import { environment } from '../environments/environmen.development';
import { ICapacity } from '../shared/models/capacity.interface';
import { ICapacityRequest } from '../shared/models/capacity.request';
import { SwitchService } from './switch.service';
import { Response } from '../shared/models/response';
@Injectable({providedIn: 'root'})
export class CapacityService {

    public capacities = signal<ITechnology[]>([])
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiCapacity;
    page = 0;

    size = 10;

    order = "asc";

    public changeOrder() {

        if(this.order === "desc") {
            this.order = "asc";
          }
        else {
            this.order = "desc";
        }
    }

    public changePage(page: number) {
        this.page = page
    }

    public changeSize(size: number){
        this.size = size
    }

    public postResponse:Response = {} as Response;

    
    modalSS = inject(SwitchService);
    
    constructor() {
        this.getCapacities();
    }
    public getCapacities() {
        return this._http.get<ICapacity[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&sortBy=${this.order}&technologies=true&field=name`)
    }

    public postCapacity(newCapacity: ICapacityRequest): void {
        this._http.post<ICapacityRequest>(this._endpoint, newCapacity)
          .subscribe({
            next: (createdCapacity: ICapacityRequest) => {
              this.modalSS.$postTechnology.next(createdCapacity)
              this.postResponse.status = 201
              this.postResponse.message = "¡Tecnologia Creada!"
              this.modalSS.$postTechnology.next(this.postResponse)
            },
            error: (error) => {
              console.log(newCapacity)
              this.postResponse = error
              this.modalSS.$postTechnology.next(this.postResponse)
            }
          });
      }
}