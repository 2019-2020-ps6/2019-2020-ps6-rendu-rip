import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Form, FormArray, FormGroup } from '@angular/forms';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {

  answerForm: FormGroup;
  @Input()
  quiz: Quiz;
  @Input()
  question: Question;
  @Input()
  answerInit: Answer;

  @Output()
  answerAdded: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
  }

  private initializeAnswerForm() {
    // console.log(this.answerInit);
    if (this.answerInit != null) {
      this.answerForm = this.formBuilder.group({
        value: [this.answerInit.value],
        isCorrect: this.answerInit.isCorrect,
      });
    } else {
      this.answerForm = this.formBuilder.group({
        value: [''],
        isCorrect: false,
      });
    }
  }
  ngOnInit() {
    this.initializeAnswerForm();
  }

  createAnswer() {
   return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer(answerToCreate: Answer) {
    // (<HTMLInputElement> document.getElementById("createAnswer")).disabled = this.showLabel;
    this.createAnswer();
  }

  addAnser_toServer(answerToCreate: Answer): void{
    if (!answerToCreate.value) {
      answerToCreate.value = 'reponse inconnu !';
     } else {
       this.quizService.addAnswer(this.quiz, this.question, answerToCreate);
       this.answerForm.reset();
     }
  }

  submitAnswer() {
    // (<HTMLInputElement> document.getElementById("createAnswer")).disabled = this.showLabel;
    const answerToCreate: Answer = this.answerForm.getRawValue() as Answer;

    if (this.answerInit == null) {
      if (!answerToCreate.isCorrect) { answerToCreate.isCorrect = false; }
      if (!answerToCreate.value) { answerToCreate.value = 'Aucune idée'; }
      this.question.answers.push(answerToCreate);
      this.answerForm.reset();
      this.answerAdded.emit(false);
    } else {
      for (let i = 0; i < this.question.answers.length; i++) {
        // tslint:disable-next-line: triple-equals
        if (this.question.answers[i] == this.answerInit) {
          this.question.answers[i] = answerToCreate;
          this.answerForm.reset();
          this.answerAdded.emit(false);
          //this.addAnser_toServer(answerToCreate);
        }
      }
    }

  }

  cancelAnswer() {
    this.answerForm.reset();
    this.answerAdded.emit(false);
  }



}
