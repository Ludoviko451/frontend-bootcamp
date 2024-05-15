import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouteImages } from '../../../util/route.images';
import { TextComponent } from "../../atoms/text/text.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { SwitchService } from '../../../api/switch.service';
import { AtomsModule } from '../../atoms/atoms.module';

@Component({
    selector: 'app-modal-message',
    standalone: true,
    templateUrl: './modal-message.component.html',
    styleUrl: './modal-message.component.css',
    imports: [NgIf, AtomsModule]
})
export class ModalMessageComponent implements OnInit{

    constructor(private modalSS:SwitchService) {
        
    }
    @Input () isSuccessful: boolean | null = false;
    @Input () alt: string = '';
    @Input () text: string = '';

    isVisible: boolean = false;

    route = RouteImages;

    getRoute() {
        if(this.isSuccessful) {
            return this.route.SUCCESS
        } else {
            return this.route.ERROR
        }
    }

    getAlt() {
        if(this.isSuccessful) {
            return 'SUCCESS ICON'
        } else {
            return 'ERROR ICON'
        }
    }
    
    closeModal() {
        this.isVisible = false;
    }

    ngOnInit(): void {
        this.modalSS.$modalMessage.subscribe((valor) => this.isVisible = valor);
    }

}
