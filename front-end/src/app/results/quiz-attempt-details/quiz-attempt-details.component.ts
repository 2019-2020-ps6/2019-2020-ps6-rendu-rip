import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { Img } from 'src/models/image.model';
import { Attempt } from 'src/models/attempt.model';
import { PlayerService } from 'src/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AttemptService } from 'src/services/attempt.service';
import { Answer } from 'src/models/answer.model';
import { Location } from '@angular/common';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-quiz-attempt-details',
  templateUrl: './quiz-attempt-details.component.html',
  styleUrls: ['./quiz-attempt-details.component.scss']
})
export class QuizAttemptDetailsComponent implements OnInit {

  headerTitle: string; 

  player: Player = {} as Player;
  attempt: Attempt = {} as Attempt;
  currentRightAnswer: Answer
  questionsStillHere: Question[];

  constructor(public playerService: PlayerService, public globalService: GlobalService, 
    public route: ActivatedRoute, public attemptService: AttemptService,
    public router: Router, private location: Location) {
  }

  ngOnInit() {
    this.headerTitle = "Résultats"
    const playerId = this.route.snapshot.paramMap.get('id');
    const attemptId = +this.route.snapshot.paramMap.get('attemptId')
    this.playerService.getPlayer(this.player, playerId);
    this.questionsStillHere = new Array<Question>();
    this.attemptService.getAllFromSpecificAttempt(this.globalService, playerId, attemptId, this.attempt, this.questionsStillHere);
  }

  loaded() {
    return this.player.id && this.attempt.id && this.attempt;
  }

  seeQuestion(questionId : string) {
    this.router.navigate([`admin/quiz-list/${this.attempt.quiz.id}/${questionId}`]);
  }

  isQuestionStillHere(question : Question){
    for (const q of this.questionsStillHere) {
      if(q.id == question.id) return true;
    }
    return false;
  }

  checkIfWrongQuestion(question : Question){
    for(let answer of this.attempt.wrongAnswers){
        if(answer.questionId===question.id){
          return true;
      }
    }
    return false;
  }

  setRightAnswer(question : Question) {
    this.currentRightAnswer = null;
    for (let index=0; index<question.answers.length; index++) {
      const curAns = question.answers[index];
      if(curAns.isCorrect){
        this.currentRightAnswer = curAns;
        break;
      }
    }
    return this.currentRightAnswer;
  }

  answerInQuestion(answer : Answer, question : Question){
    return answer.questionId === question.id;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location
  }
}
