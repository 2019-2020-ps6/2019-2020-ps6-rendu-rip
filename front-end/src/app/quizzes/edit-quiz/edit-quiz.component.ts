import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { QUIZ_LIST } from '../../../mocks/quiz-list.mock';


@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  quizSelected : Quiz;

  constructor(private route: ActivatedRoute, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quizSelected = quiz);
   }

  ngOnInit() {
    //this.getId();
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    console.log(this.quizSelected);
    if(!this.quizSelected)this.quizSelected =QUIZ_LIST[0] ;
  }

  /*getId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.quizService.quizzes$.
    subscribe(quizzes => {
      let list = quizzes.filter(quiz => quiz.id.toString()==id.toString());
      if(list.length>0)this.quizSelected = list[0];
    }
    )
    console.log(this.quizSelected);
  }
  */
}
