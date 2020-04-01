import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-answer-list-widget',
  templateUrl: './answer-list-widget.component.html',
  styleUrls: ['./answer-list-widget.component.scss']
})
export class AnswerListWidgetComponent implements OnInit {

  @Input()
  answers: Answer[];

  @Output()
  selected: EventEmitter<Answer> = new EventEmitter<Answer>();

  @Output()
  next: EventEmitter<boolean> = new EventEmitter<boolean>();


  TIME_OUT_VALUE: number = 10000; // 10000 ms == 10s
  TIME_OUT_ANS_VALUE: number = 5000; // 10000 ms == 10s

  answerSelected : Answer;
  rightAnswer : Answer;

  displayAns: boolean;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.displayAns = false;
    this.answerSelected = null;
    this.startTimer();
  }

  setRightAnswer() {
    for (let index = 0; index < this.answers.length; index++) {
      const curAns = this.answers[index];
      if(curAns.isCorrect){
        this.rightAnswer = curAns;
        break;
      }
    }
  }

  //réponse sélectionnée
  onAnswerSelected(answer: Answer) {
    this.setRightAnswer();
    this.answerSelected = answer;
    this.selected.emit(answer);
    this.displayAns = true;//affichage réponse donnée VS réponse attendue
    this.startResTimer();//lancement du passage automatique (à la question suivante)
  }

  nextQuestion(){
    if(this.answerSelected == null) this.selected.emit(null);//pour que soit intercept et sache --> rep enregistrée dans bd: null si non rep --> perte focus
    this.next.emit(true);
    this.init();
  }

  //n'a pas répondu --> passe à la réponse directement (permet de recapter attention)
  startTimer = () => setTimeout(() => {
    this.setRightAnswer();
    this.toggleAnswer();
    this.startResTimer();
  }, this.TIME_OUT_VALUE);

  //passage automatique à la question suivante après avoir lu la réponse
  startResTimer = () => setTimeout(() => this.nextQuestion(), this.TIME_OUT_ANS_VALUE);

  toggleAnswer = () => this.displayAns = !this.displayAns;
}
