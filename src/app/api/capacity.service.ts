import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ITechnology } from '../shared/models/technology.interface';
import { environment } from '../environments/environmen.development';
import { tap } from 'rxjs';
import { ICapacity } from '../shared/models/capacity.interface';

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


    
    constructor() {
        this.getCapacities();
    }
    public getCapacities() {
        return this._http.get<ICapacity[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&sortBy=${this.order}&technologies=true&field=name`)
    }
}