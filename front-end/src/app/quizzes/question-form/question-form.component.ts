import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Form, FormArray, FormGroup } from '@angular/forms';
import { QuestionService } from 'src/services/question.service';
import { Question } from 'src/models/question.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;
  questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initializeQuestionForm();
    console.log("question form")
    //console.log(this.quiz)
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
    //if (!questionToCreate.label) {questionToCreate.label = 'Question inconnue';}
    if (!questionToCreate.label) {
      window.alert("Veuillez mettre une question")
      return;
    }
    this.quizService.addQuestion(this.quiz, questionToCreate);
    this.questionForm.reset();
  }

}
