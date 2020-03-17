import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  quizSelected: Quiz;

  constructor(private route: ActivatedRoute, public quizService: QuizService) {
   }

  ngOnInit() {
    this.getId();
  }

  getId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.quizzes$.
    subscribe(quizzes => {
      // tslint:disable-next-line: triple-equals
      const list = quizzes.filter(quiz => quiz.id == (id));
      if (list.length > 0) {
        this.quizSelected = list[0];
      }
      console.log(this.quizSelected);
    }
    );
  }
}
