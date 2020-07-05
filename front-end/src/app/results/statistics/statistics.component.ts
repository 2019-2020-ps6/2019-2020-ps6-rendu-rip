import { Component, OnInit } from '@angular/core';
import { AttemptService } from 'src/services/attempt.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/services/player.service';
import { ImageService } from 'src/services/image.service';
import { Player } from 'src/models/player.model';
import { Img } from 'src/models/image.model';
import { Attempt } from 'src/models/attempt.model';
import { Location } from '@angular/common';
import { SortDatePipe } from 'src/services/sortDate.pipe';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  headerTitle: string;

  player: Player;
  playerImage: Img = {} as Img;
  playerAttempts: Attempt[];
  chronologicalOrder : boolean;
  selectedAttempt: Attempt;

  constructor(private modalService: ModalService, private sortDate : SortDatePipe, public playerService: PlayerService, public imageService: ImageService, 
    public router: ActivatedRoute, public attemptService: AttemptService,
    private location: Location) {}

  ngOnInit() {
    const playerId = this.router.snapshot.paramMap.get('id');
    this.playerService.setSelectedPlayer(playerId);
    
    this.chronologicalOrder = false;
    //this.attemptService.attempts$.subscribe();
    this.playerService.playerSelected$.subscribe((player) => {
      this.player = player;
      this.playerAttempts = [];
      this.headerTitle = `Résultats de ${player.name}`;
      if(this.player.imageId) this.imageService.loadPlayerImage(this.playerImage, this.player.imageId);
      this.attemptService.getPlayerAttempts(player.id, this.playerAttempts);
    });
  }

  goBack() {
    this.location.back(); // <-- go back to previous location
  }

  checkAttempt(attempt: Attempt){
    this.selectedAttempt = attempt;
  }

  deleteAttempt(attempt : Attempt){
    this.attemptService.deleteAttempt(attempt);
  }

  switchOrder(){
    this.chronologicalOrder = !this.chronologicalOrder;
    if(this.chronologicalOrder)
      this.sortDate.transform(this.playerAttempts, "date")
    else
      this.sortDate.transform(this.playerAttempts, "-date")
  }
}
