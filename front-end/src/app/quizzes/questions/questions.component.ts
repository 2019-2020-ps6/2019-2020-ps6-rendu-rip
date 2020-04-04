import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/Question.model';
import { Answer } from '../../../models/answer.model';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  showFormQuestion : boolean;
  errorMessage : String;
  questionForm: FormGroup;


  @Input()
  question: Question;
  @Input()
  quiz: Quiz;

  @Output()
  questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();
  @Output()
  theQuestionIsInvalid : EventEmitter<boolean> = new EventEmitter<boolean>();//non utilisé, servira peut-être à mettre un tag incomplet à un quiz, (pas testé non plus^^)


  public answers: Answer[];

  constructor(public formBuilder: FormBuilder, public quizService:QuizService) { }

  ngOnInit() {
    this.answers = this.question.answers;
  }

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label : [this.question.label]
    });
  }

  submitQuestionLabel() {
    const questionToUpdate: Question = this.questionForm.getRawValue() as Question;
    if (!questionToUpdate.label) { 
      window.alert("Veuillez remplir la question.")
      return;
    }
    this.question.label = questionToUpdate.label;
    this.quizService.updateQuestion(this.quiz,this.question);
    this.questionForm.reset();
    this.showFormQuestion = false;
  } 


  cancelQuestionLabel() {
    this.questionForm.reset();
    this.showFormQuestion=false;
  }
  supprAnswer(answer: Answer) {
    this.quizService.deleteAnswer(this.quiz, this.question, answer);
  }
  
  editAnswer(answer: Answer) {
    this.answerSelected = answer;
    this.switchShow(true);
  }

  editLabelQuestion(){
    this.initializeQuestionForm();
    this.showFormQuestion =true;
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



  questionInvalid(){
    if(!this.answers|| this.answers.length==0){
      this.errorMessage = "Il n'y a pas de réponses possibles."
      this.theQuestionIsInvalid.emit(true);
      return true;
    }
    var oneRightAnswer = false
    this.answers.forEach(element =>{
      if(element.isCorrect) oneRightAnswer = true; })
    if(!oneRightAnswer){
      this.errorMessage = "Il n'y a pas de réponse correcte."
      this.theQuestionIsInvalid.emit(true);
      return true;
    }
    if(this.answers.length!=4){
      this.errorMessage = "Il faudrait 4 réponses."
      this.theQuestionIsInvalid.emit(true);
      return true;
    }
  }
}
