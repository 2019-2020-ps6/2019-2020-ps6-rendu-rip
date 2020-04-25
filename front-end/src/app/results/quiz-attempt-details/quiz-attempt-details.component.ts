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

@Component({
  selector: 'app-quiz-attempt-details',
  templateUrl: './quiz-attempt-details.component.html',
  styleUrls: ['./quiz-attempt-details.component.scss']
})
export class QuizAttemptDetailsComponent implements OnInit {

  player: Player;
  playerImage: Img ={} as Img;
  attempt: Attempt = {} as Attempt;
  quizId: string;
  questionId: string;


  constructor(public playerService: PlayerService, public imageService: ImageService, 
    public route: ActivatedRoute, public attemptService: AttemptService,
    public router: Router, private location: Location) {
    }

  ngOnInit() {
    const playerId = this.route.snapshot.paramMap.get('id');
    this.attemptService.getSpecificPlayerAttempt(playerId, +this.route.snapshot.paramMap.get('attemptId'), this.attempt);
    //this.quizService.retrieveQuiz(this.attempt.quizId,this.quiz);//???
  }

  ngOnUpdate() {
  }

  loaded() {
    return this.attempt;
  }

  seeQuestion(questionId: string) {
    this.router.navigate([`admin/quiz-list/${this.attempt.quizId}/${questionId}`]);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
