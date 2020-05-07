import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { ImageService } from 'src/services/image.service';
import { PlayerService } from 'src/services/player.service';
import { Img } from 'src/models/image.model';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/services/modal.service';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {

  headerTitle: string;

  player: Player;
  playerPhoto: Img = {} as Img;
  quizVisible: Quiz[];
  quizzes: Quiz[];

  constructor(private globalService :GlobalService, private quizService : QuizService, private modalService : ModalService, public playerService: PlayerService, public imageService: ImageService, 
    public router: ActivatedRoute) {
  }

  ngOnInit() {
    this.playerService.playerSelected$.subscribe((player) => {
      this.player = player;
      this.headerTitle = player.name;
      this.imageService.loadPlayerImage(this.playerPhoto, this.player.imageId);
      this.quizService.quizzes$.subscribe((quizzes) => {
        this.quizVisible = [];
        this.quizzes = quizzes;
        quizzes.forEach((quiz) =>{
          if(this.playerService.quizVisibleByPlayer(this.player,quiz.id)){
            this.quizVisible.push(quiz);
          }
        })
      });
    });
    const playerId = this.router.snapshot.paramMap.get('id');
    this.playerService.setSelectedPlayer(playerId);
  }

  removeVisibility(quiz : Quiz){
    this.player.quizVisible = this.player.quizVisible.filter((quizId) => quizId!==quiz.id )  
    this.playerService.updatePlayer(this.player); 
  }
}
