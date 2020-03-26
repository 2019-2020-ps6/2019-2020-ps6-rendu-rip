import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

import { Quiz } from '../../../models/quiz.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  quizSelected: Quiz;

  constructor(private route: ActivatedRoute, public quizService: QuizService, private sanitizer: DomSanitizer) {
    
   }

  ngOnInit() {
    this.quizService.quizSelected$.subscribe((quiz) => this.quizSelected = quiz);
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  sanitize(url: string) {
    if(!url) url = this.quizService.imageByDefault();
    return this.sanitizer.bypassSecurityTrustUrl(url);
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
