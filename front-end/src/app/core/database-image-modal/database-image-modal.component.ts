import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
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
    @Input()
    id : string;

    @Output() onChangeFile_bis: EventEmitter<boolean> = new EventEmitter<boolean>();

    //@Output()   //inutile car ImgTmp est modifiée car passée par référence
    //imageSelected: EventEmitter<Img> = new EventEmitter<Img>();
    gallery : Img[] = [];


    constructor(private modalService: ModalService, public imageService : ImageService){}
    
    ngOnInit(){
      this.imageService.loadAllImgs(this.gallery);
      if(!this.id) this.id = "";
    }

    onImgClicked(modal, imageTmp : Img, image : Img){
        this.imageService.onImgClicked(modal, imageTmp,image);
        this.onChangeFile_bis.emit(true);
        //this.imageSelected.emit(this.imageTmp);
    }
}