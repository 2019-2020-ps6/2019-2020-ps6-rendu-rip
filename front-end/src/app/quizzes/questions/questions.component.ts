import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/Question.model';
import { Answer } from '../../../models/answer.model';
import { FormGroup } from '@angular/forms';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  answerSelected: Answer;
  show: boolean;


  @Input()
  question: Question;
  questionForm: FormGroup;
  @Input()
  quiz: Quiz;

  @Output()
  questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();
  AnswerPrinted: EventEmitter<Answer> = new EventEmitter<Answer>();


  public answers: Answer[];

  public CorectAnswer: Answer;

  constructor(public quizService:QuizService) { }

  ngOnInit() {
    this.answers = this.question.answers;
  }
  supprAnswer(answer: Answer) {
    this.answers.splice(this.answers.indexOf(answer), 1);
    this.quizService.deleteAnswer(this.quiz, this.question, answer);
    
  }
  editAnswer(answer: Answer) {
    this.answerSelected = answer;
    this.switchShow(true);
  }

  deleteQuestion() {
    this.questionDeleted.emit(this.question);
  }
  createAnswer() {
    this.switchShow(true);
  }

  reset(show: boolean) {
    this.switchShow(show);
    this.answerSelected = null;
  }
  switchShow(show: boolean) {
    this.show = show;
  }

  printCorrectAnswer() {
    this.answers.forEach(element => {
      if (element.isCorrect) {
        this.AnswerPrinted.emit();
        this.CorectAnswer = element;
      }
    });
  }
}
