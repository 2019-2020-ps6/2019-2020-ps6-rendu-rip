import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/services/image.service';
import { Img } from 'src/models/image.model';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-database-image-modal',
  templateUrl: './database-image-modal.component.html',
  styleUrls: ['./database-image-modal.component.scss']
})
export class DatabaseImageModalComponent implements OnInit {
    
  
    @Input()
    imageTmp : Img;

    //@Output()   //inutile car ImgTmp est modifiée car passée par référence
    //imageSelected: EventEmitter<Img> = new EventEmitter<Img>();
    gallery : Img[] = [];


    constructor(private modalService: ModalService, public imageService : ImageService){
      this.imageService.loadAllImgs(this.gallery);
    }
    
    ngOnInit(){}

    onImgClicked(modal, imageTmp : Img, image : Img){
        this.imageService.onImgClicked(modal, imageTmp,image);
        //this.imageSelected.emit(this.imageTmp);
    }
}