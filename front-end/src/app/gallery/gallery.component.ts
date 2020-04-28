import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/services/image.service';
import { Img } from 'src/models/image.model';
import { Location } from '@angular/common';
import { QuizService } from 'src/services/quiz.service';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images: Img[] = []

  imageSelected : Img;

  res :  Img = {} as Img;

  constructor(public modalService :ModalService, public imageService:ImageService, public quizService : QuizService, private location: Location) {
  }

  ngOnInit() {
    this.imageService.loadAllImgs(this.images);
  }

  selectedImg(img : Img) {
    this.imageSelected = img;
    console.log(img);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  checkIfImageIsUsed(img : Img){
    this.imageSelected = img;
    this.quizService.checkIfImageIsUsed(img.id,this.res)
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
    this.imageService.deleteImage(img, this.images);
    this.images.length = 0;
    this.imageService.loadAllImgs(this.images);
  }
}
