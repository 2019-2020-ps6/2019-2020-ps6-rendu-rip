import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-player-list-player',
  templateUrl: './player-list-player.component.html',
  styleUrls: ['./player-list-player.component.scss']
})
export class PlayerListPlayerComponent implements OnInit {

  public playerList: Player[] = [];
  guest : Player;

  constructor(public playerService: PlayerService) {
    this.playerService.players$.subscribe((player) => {
      this.playerList = player
      this.guest=this.findGuest();
    });
  }

  findGuest(){
    for(let player of this.playerList){
      if(player.id=="1"){
        this.playerList=  this.playerList.filter(pl=>pl!==player)
        return player;
      }
    }
    return null;
  }

  ngOnInit() {}
}
