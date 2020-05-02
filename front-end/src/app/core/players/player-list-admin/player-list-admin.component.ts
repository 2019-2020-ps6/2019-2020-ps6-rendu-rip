import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../../services/player.service';
import { Player } from '../../../../models/player.model';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-player-list-admin',
  templateUrl: './player-list-admin.component.html',
  styleUrls: ['./player-list-admin.component.scss']
})
export class PlayerListAdminComponent implements OnInit {

  public playerList: Player[] = [];
  showForm : boolean = false;

  constructor(private modalService: ModalService, public playerService: PlayerService) {
    this.playerService.players$.subscribe((player) => this.playerList = player);
  }

  ngOnInit() {
  }

  deletePlayer(player: Player) { this.playerService.deletePlayer(player); }
}
