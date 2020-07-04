import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../../services/player.service';
import { Player } from '../../../../models/player.model';
import { ModalService } from 'src/services/modal.service';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-player-list-admin',
  templateUrl: './player-list-admin.component.html',
  styleUrls: ['./player-list-admin.component.scss']
})
export class PlayerListAdminComponent implements OnInit {

  headerTitle = "Liste des Accueillis";

  public playerList: Player[] = [];
  showForm : boolean = false;

  constructor(private modalService: ModalService, public globalService: GlobalService,
    public playerService: PlayerService) {
    this.playerService.players$.subscribe((player) => {
      this.playerList = player
      this.findGuest();
    });
  }

  findGuest(){
    for(let player of this.playerList){
      if(player.id=="1"){
        this.playerList=  this.playerList.filter(pl=>pl!==player)
      }
    }
  }
  ngOnInit() {
  }

  deletePlayer(player: Player) { 
    const imgId = player.imageId;
    if(this.globalService.isAnImage(imgId) &&
    !this.globalService.isDefaultImage(imgId)) this.globalService.deletePlayerPhoto(imgId);
    this.playerService.deletePlayer(player);
   }
}
