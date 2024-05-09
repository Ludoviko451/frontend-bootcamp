import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ITechnology } from '../shared/models/technology.interface';
import { environment } from '../environments/environmen.development';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ITechnologyRequest } from '../shared/models/technology.request';
import { SwitchService } from './switch.service';

@Injectable({providedIn: 'root'})
export class TechnologyService {

    public technologys = signal<ITechnology[]>([])
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiTechnology;
    private size = 3;
    public page = 0;
    constructor(private modalSS: SwitchService) {
        this.getTechnologies();
    }

    public changeSize(size : number) {
  
        this.size = size;
    }

    public nextPage(){
        this.page = this.page + 1
    }
    public changePage(page: number) {

        this.page = page
    }
    public getTechnologies(): Observable<ITechnology[]>{

      return this._http.get<ITechnology[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&sortBy=desc&field=name`)
    }

    public postTechnology(newTechnology: ITechnologyRequest): void {
        this._http.post<ITechnologyRequest>(this._endpoint, newTechnology)
          .subscribe({
            next: (createdTechnology: ITechnologyRequest) => {
              console.log('Technology created successfully:', createdTechnology);
              this.modalSS.$created.emit('success');
            },
            error: (error) => {
              console.error(error);
              this.modalSS.$created.emit(error);
            }
          });
      }

}