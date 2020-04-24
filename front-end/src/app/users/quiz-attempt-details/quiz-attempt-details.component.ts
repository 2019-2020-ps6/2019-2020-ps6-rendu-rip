import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { Img } from 'src/models/image.model';
import { Attempt } from 'src/models/attempt.model';
import { UserService } from 'src/services/user.service';
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

  user: User;
  userImage: Img ={} as Img;
  attempt: Attempt = {} as Attempt;
  quizId: string;
  questionId: string;


  constructor(public userService: UserService, public imageService: ImageService, 
              public route: ActivatedRoute, public attemptService: AttemptService,
              public router: Router, private location: Location) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.attemptService.getSpecificUserAttempts(userId,+this.route.snapshot.paramMap.get('id'),this.attempt);
    //this.quizService.retrieveQuiz(this.attempt.quizId,this.quiz);
  }

  ngOnUpdate() {
  }

  loaded() {
    return this.attempt;
  }

  seeAnswer( answer: Answer ) {
    this.router.navigate([`edit-quiz/${this.attempt.quizId}/${answer.questionId}`]);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
