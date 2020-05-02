import { Component, OnInit, Input } from '@angular/core';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { Player } from 'src/models/player.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  image: Img = {} as Img;
  
  constructor(public imageService: ImageService) {}

  ngOnInit() {
    this.title = this.title == null? this.title = "Pas de titre" : `${this.title}`
  }
}
