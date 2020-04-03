import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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


  aRightAnswerIsAlreadyPresent : boolean = false;
  
  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
  }

  ngOnInit() {
    this.rightAnswerPresent();
    this.initializeAnswerForm();
  }

  private initializeAnswerForm() {
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

  submitAnswer() {
    const answerToCreate: Answer = this.answerForm.getRawValue() as Answer;
    if (!answerToCreate.value) { 
      window.alert("Veuillez mettre une réponse.")
      return
    }
    if (this.answerInit == null) {
      if (!answerToCreate.isCorrect) { answerToCreate.isCorrect = false; }
      //if (!answerToCreate.value) { answerToCreate.value = 'Aucune idée'; }
      this.quizService.addAnswer(this.quiz, this.question, answerToCreate);
      this.answerForm.reset();
      this.answerAdded.emit(false);
    } 
    else {
      for (let i = 0; i < this.question.answers.length; i++) {
        if (this.question.answers[i] == this.answerInit) {
          answerToCreate.id = this.answerInit.id;
          this.quizService.updateAnswer(this.quiz,this.question,answerToCreate);
          this.answerForm.reset();
          this.answerAdded.emit(false);
          break;
        }
      }
    }

  }

  cancelAnswer() {
    this.answerForm.reset();
    this.answerAdded.emit(false);
  }

  rightAnswerPresent() {
    this.question.answers.forEach(element => {
      if (element.isCorrect === true) {
        this.aRightAnswerIsAlreadyPresent = true;
      }
    });
  }

  isSetToRight() : boolean{
      if(this.answerInit==null) return false;
      return this.answerInit.isCorrect;
  }



}
