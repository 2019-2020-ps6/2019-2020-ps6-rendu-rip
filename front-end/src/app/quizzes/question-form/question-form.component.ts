import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, FormArray, FormGroup } from '@angular/forms';
import { QuestionService } from 'src/services/question.service';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public questionService: QuestionService) {
    this.initializeQuestionForm();
   }

   private initializeQuestionForm() {
     this.questionForm = this.formBuilder.group({
       label: ['']
     });
   }
  ngOnInit() {
  }


  createQuestion() {
    const questionToCreate: Question = this.questionForm.getRawValue() as Question;
    questionToCreate.answers = [];
    if (!questionToCreate.label) {
      questionToCreate.label = 'Question inconnue';
    }
    this.questionService.addQuestion(questionToCreate);
    this.questionForm.reset();
  }

}
