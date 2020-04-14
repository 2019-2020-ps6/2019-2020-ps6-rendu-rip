import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/services/image.service';
import { Img } from 'src/models/image.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent implements OnInit {

  images: Img[] = []

  constructor(public imageService:ImageService, private location: Location) {
      imageService.loadAllImgs(this.images);
  }

  ngOnInit() {
  }

  getImgSrc(image: Img) { return this.imageService.sanitize(image.url) }

  selectedImg(imgId :String) {
    console.log(imgId)
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
