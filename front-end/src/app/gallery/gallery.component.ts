import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/services/image.service';
import { Img } from 'src/models/image.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images: Img[] = []

  constructor(public imageService:ImageService, private location: Location) {
      imageService.loadAllImgs(this.images);
  }

  ngOnInit() {
  }

  selectedImg(imgId :String) {
    console.log(imgId)
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
