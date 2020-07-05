import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/services/player.service';
import { Player } from '../../../../models/player.model';
import { Img } from '../../../../models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  @Input() player: Player;
  @Output() playerDeleted: EventEmitter<Player> = new EventEmitter<Player>();
  image: Img;

  constructor(public playerService : PlayerService, public imageService : ImageService) {}

  ngOnInit() { this.loadImage(); }

  loadImage(){
    this.image = {} as Img;
    const id = this.player.imageId;//image par défaut si non présente
    this.imageService.loadPlayerImage(this.image, id);
  }

  deleteplayer() { this.playerDeleted.emit(this.player); }
}
