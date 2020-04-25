import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { ImageService } from 'src/services/image.service';
import { PlayerService } from 'src/services/player.service';
import { Img } from 'src/models/image.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  player: Player;
  playerImage: Img ={} as Img;

  constructor(public playerService: PlayerService, public imageService: ImageService, 
    public router: ActivatedRoute) {
  }

  ngOnInit() {
    this.playerService.playerSelected$.subscribe((player) => {
      this.player = player;
      if(this.player.imageId){
        this.imageService.loadPlayerImage(this.playerImage,this.player.imageId);
      }
    });
    const playerId = this.router.snapshot.paramMap.get('id');
    this.playerService.setSelectedPlayer(playerId);
  }
}
