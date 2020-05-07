import { Component, OnInit, Input} from '@angular/core';
import { ModalService } from 'src/services/modal.service';
import { GlobalService } from 'src/services/global.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { PlayerService } from 'src/services/player.service';
import { Quiz } from 'src/models/quiz.model';
import { Player } from 'src/models/player.model';


@Component({
    selector: 'app-associate-quiz-modal',
    templateUrl: './associate-quiz-modal.component.html',
    styleUrls: ['./associate-quiz-modal.component.scss']
  })
  export class AssociateQuizModal implements OnInit {
    
    @Input()
    player: Player
    @Input()
    quizzes:Quiz[]

    checkForm : FormGroup;
    quizSelected : Quiz[] = [];

    constructor(public playerService : PlayerService, public formBuilder : FormBuilder, public modalService : ModalService, public globalService : GlobalService ) {
  
    }

    ngOnInit(){
      this.initCheckForm();
  }
 
    private initCheckForm() {
        this.checkForm = this.formBuilder.group({
        checkBoxes: new FormArray([])
        });
        this.quizzes.forEach((quiz) => {
        const checkBox = new FormControl(this.playerService.quizVisibleByPlayer(this.player,quiz.id)); // dans les parenthèse pour init
        (this.checkForm.controls.checkBoxes as FormArray).push(checkBox);
        });
    }

    submit() {
      for(var i = 0; i<this.checkForm.value.checkBoxes.length;i++){
        if(this.checkForm.value.checkBoxes[i]){
          this.quizSelected.push(this.quizzes[i]);
        }
      }
      for(let quiz of this.quizSelected){
        if(!this.playerService.quizVisibleByPlayer(this.player,quiz.id)){
            this.player.quizVisible.push(quiz.id);
        }
      }
      this.playerService.updatePlayer(this.player);
    }

    reset(){
        this.quizSelected = [];
    }
}