import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/services/player.service';
import { Player } from 'src/models/player.model';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})

export class EndComponent implements OnInit {

  private player: Player;

  constructor(private route: ActivatedRoute, public playerService: PlayerService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.setSelectedPlayer(id);
    this.playerService.playerSelected$.subscribe((player) => this.onPlayerSelected(player));
  }

  private onPlayerSelected(player: Player) {
    this.player = player;
  }
}


