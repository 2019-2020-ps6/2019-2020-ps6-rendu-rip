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

  public playerList: Player[];
  selectedPlayer: Player;

  constructor(private modalService: ModalService, public globalService: GlobalService,
    public playerService: PlayerService) {
    this.playerService.players$.subscribe((players) => {
      this.playerList = players.filter(p => p.id != "1");
    });
  }

  ngOnInit() {
  }

  checkPlayer(player: Player){
    this.selectedPlayer = player;
  }

  deletePlayer(player: Player) { 
    const imgId = player.imageId;
    if(this.globalService.isAnImage(imgId) && !this.globalService.isDefaultImage(imgId)) this.globalService.deletePlayerPhoto(imgId);
    this.playerService.deletePlayer(player);
  }
}
