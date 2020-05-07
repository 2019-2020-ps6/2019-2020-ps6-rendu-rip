import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalService } from 'src/services/modal.service';
import { Quiz } from 'src/models/quiz.model';
import { Player } from 'src/models/player.model';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-visibility-choice-modal',
  templateUrl: './visibility-choice-modal.component.html',
  styleUrls: ['./visibility-choice-modal.component.scss']
})
export class VisibilityChoiceModal implements OnInit {

    @Input()
    quiz : Quiz;

    players : Player[];
    playersToSetVisibility : Player[] = [];
    playersToUnsetVisibility : Player[] = [];
    all : boolean;

  constructor(private modalService: ModalService, public playerService : PlayerService) {

  }

  ngOnInit() {
    this.playerService.players$.subscribe((players) => {
      this.players = players;
      this.all = this.playerService.quizVisibleByAll(this.players,this.quiz.id);
    });
  this.playerService.setPlayersFromUrl();
  }

  setPlayersSelected(playersSelected : Player[]){
    this.playersToSetVisibility = playersSelected;
    this.playersToUnsetVisibility = this.players.filter(player => playersSelected.indexOf(player) < 0);
    if(!(this.playersToSetVisibility.length===this.players.length)){
      this.all = false;
    }
  }
  
  save(){
    if(this.all){
      this.playersToSetVisibility = this.players;
    }
    for(let player of this.playersToSetVisibility){
        if(!this.playerService.quizVisibleByPlayer(player,this.quiz.id)){
          player.quizVisible.push(this.quiz.id);
          this.playerService.updatePlayer(player);
        }
    }
    for(let player of this.playersToUnsetVisibility){
      if(this.playerService.quizVisibleByPlayer(player,this.quiz.id)){
        player.quizVisible = player.quizVisible.filter( id => id!==this.quiz.id);
        this.playerService.updatePlayer(player);
      }
    }
    this.reset();
  }

  reset(){
      this.playersToSetVisibility = [];
      this.playersToUnsetVisibility = [];
      this.all = this.playerService.quizVisibleByAll(this.players,this.quiz.id);
  }


}