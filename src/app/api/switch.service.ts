import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SwitchService {
    constructor() { }
    //Un objeto observable es un objeto que vamos a poder observar, es un objeto que tiene un valor que vamos
    // a estar constantemente observando
    
    
    $modal = new EventEmitter<any>();
    $modalCapacity = new EventEmitter<any>();
    $modalMessage = new EventEmitter<any>();
    $postTechnology = new EventEmitter<any>();
    
}