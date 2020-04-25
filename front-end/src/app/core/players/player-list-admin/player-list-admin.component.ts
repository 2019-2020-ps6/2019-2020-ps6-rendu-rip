import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../../services/player.service';
import { Player } from '../../../../models/player.model';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-player-list-admin',
  templateUrl: './player-list-admin.component.html',
  styleUrls: ['./player-list-admin.component.scss']
})
export class PlayerListAdminComponent implements OnInit {

  public playerList: Player[] = [];
  showForm : boolean = false;
  modalOptions:NgbModalOptions;

  constructor(private modalService: NgbModal, public playerService: PlayerService) {
    this.playerService.players$.subscribe((player) => this.playerList = player);
  }

  ngOnInit() {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  switchShowForm(show : boolean){
    this.showForm = show;
  }

  open(content) {
    this.modalService.open(content, this.modalOptions);
  }

  deletePlayer(player: Player) { this.playerService.deletePlayer(player); }
}
