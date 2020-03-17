import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})

export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  public THEME_LIST : String[];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
      creationDate : new Date()
    });
    this.THEME_LIST= ["Sport","Actor","Autres"];
  }

  ngOnInit() {
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    if(!quizToCreate.theme)quizToCreate.theme = 'Autres';
    if(!quizToCreate.name)quizToCreate.name = 'Pas de nom de quiz';
    quizToCreate.questions =  [];
    //console.log('Add quiz: ', quizToCreate);
    this.quizService.addQuiz(quizToCreate);

  }

}
