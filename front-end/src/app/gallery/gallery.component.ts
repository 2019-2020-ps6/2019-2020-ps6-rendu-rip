import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/services/image.service';
import { Img } from 'src/models/image.model';
import { Location } from '@angular/common';
import { QuizService } from 'src/services/quiz.service';
import { ModalService } from 'src/services/modal.service';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  headerTitle = "Galerie d'images"

  images: Img[] = []
  imageSelected : Img;
  res :  Img = {} as Img;
  
  constructor(public modalService :ModalService, public globalService: GlobalService, 
    private location: Location) {
  }

  ngOnInit() {
    this.globalService.loadAllImgs(this.images);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  checkIfImageIsUsed(img: Img){
    this.imageSelected = img;
    this.globalService.checkIfImageIsUsed(img.id, this.res)
  }

  reset(){
    this.res = {} as Img;
    this.imageSelected = {} as Img;
  }

  used(res : string) {
    if(res === "true") return true;
    else if(res === "false") return false;
  }

  deleteImg(img: Img) {
    this.imageSelected = img;
    this.globalService.deleteImage(img);
    this.images.length = 0;
    this.globalService.loadAllImgs(this.images);
  }
}
