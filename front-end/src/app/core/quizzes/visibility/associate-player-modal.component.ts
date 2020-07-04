import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/models/player.model';
import { ModalService } from 'src/services/modal.service';
import { GlobalService } from 'src/services/global.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PlayerService } from 'src/services/player.service';
import { Quiz } from 'src/models/quiz.model';


@Component({
    selector: 'app-associate-player-modal',
    templateUrl: './associate-player-modal.component.html',
    styleUrls: ['./associate-player-modal.component.scss']
  })
  export class AssociatePlayerModal implements OnInit {
    
    @Input()
    players : Player[]
    @Input()
    all : boolean
    @Input()
    quiz : Quiz

    @Output()
    selected: EventEmitter<Player[]> = new EventEmitter<Player[]>();

    checkForm : FormGroup;
    playersSelected : Player[] = [];

    constructor(public playerService : PlayerService, public formBuilder : FormBuilder, public modalService : ModalService, public globalService : GlobalService ) {
    }

    ngOnInit(){
      this.initCheckForm();
    }
    
    ngOnChanges(){
      this.initCheckForm();
    }

    private initCheckForm() {
      this.checkForm = this.formBuilder.group({
        checkBoxes: new FormArray([])
      });
      //filter out guest account
      this.players = this.players.filter(p => p.id != "1");
      this.players.forEach(player => {
        const checkBox = new FormControl(this.all || this.playerService.quizVisibleByPlayer(player, this.quiz.id)); // dans les parenthèse pour init
        (this.checkForm.controls.checkBoxes as FormArray).push(checkBox);
      });
    }

    submit() {
      this.playersSelected = [];
      for(var i = 0; i<this.checkForm.value.checkBoxes.length;i++){
        if(this.checkForm.value.checkBoxes[i]){
          this.playersSelected.push(this.players[i]);
        }
      }
      this.selected.emit(this.playersSelected);
    }

    reset(){
        this.playersSelected = [];
    }
}