import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ITechnology } from '../shared/models/technology.interface';
import { environment } from '../environments/environmen.development';
import { tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TechnologyService {

    public technologys = signal<ITechnology[]>([])
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiTechnology;

    public page = 0;
    constructor() {
        this.getTechnologys();
    }

    public nextPage() {
        this.page++
        console.log(this.page)
    }

    public previousPage() {
        if (this.page > 0) {
        this.page--
        }
        console.log(this.page)
    }
    public getTechnologys() {
        this._http.get<ITechnology[]>(`${this._endpoint}?page=${this.page}&size=3&sortBy=asc&field=id`)
        .pipe(tap((data:ITechnology[]) => this.technologys.set(data)))
        .subscribe();
    }

}