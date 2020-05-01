import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { Img } from 'src/models/image.model';
import { Attempt } from 'src/models/attempt.model';
import { PlayerService } from 'src/services/player.service';
import { ImageService } from 'src/services/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AttemptService } from 'src/services/attempt.service';
import { Answer } from 'src/models/answer.model';
import { Location } from '@angular/common';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-quiz-attempt-details',
  templateUrl: './quiz-attempt-details.component.html',
  styleUrls: ['./quiz-attempt-details.component.scss']
})
export class QuizAttemptDetailsComponent implements OnInit {

  player: Player = {} as Player;
  attempt: Attempt = {} as Attempt;
  quizId: string;
  questionId: string;
  wrongQuestions : Question[] = []
  quiz : Quiz = {} as Quiz
  quizImage : Img = {} as Img


  constructor(public playerService: PlayerService, public imageService: ImageService, 
    public route: ActivatedRoute, public attemptService: AttemptService,
    public router: Router, private location: Location) {
    }

  ngOnInit() {
    const playerId = this.route.snapshot.paramMap.get('id');
    const attemptId = +this.route.snapshot.paramMap.get('attemptId')
    this.playerService.getplayer(this.player, playerId);
    this.attemptService.getSpecificAllFromAttempt(playerId, attemptId, this.attempt, this.quiz, this.quizImage);
  }

  loaded() {
    console.log(this.attempt)
    return this.player.id && this.attempt.id && this.quiz.id && this.quizImage.url;
  }

  seeQuestion(questionId: string) {
    this.router.navigate([`admin/quiz-list/${this.attempt.quizId}/${questionId}`]);
  }

  checkIfWrongQuestion(question : Question){
    let res = false;
    this.attempt.wrongAnswers.forEach((answer)=>{
      if(answer.questionId===question.id){
        res = true;
      }
    })
    return res;
  }

  
  setRightAnswer(question : Question) {
    let rightAnswer ={} as Answer;
    if(!question.answers)return;
    for (let index = 0; index < question.answers.length; index++) {
      const curAns = question.answers[index];
      if(curAns.isCorrect){
        rightAnswer = curAns;
        break;
      }
    }
    console.log(rightAnswer)
    return rightAnswer;
  }



  answerInQuestion(answer : Answer, question : Question){
    return answer.questionId === question.id;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
