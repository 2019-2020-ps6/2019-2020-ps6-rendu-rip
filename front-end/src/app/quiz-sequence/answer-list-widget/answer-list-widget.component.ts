import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  private timer: any;//NodeJS.Timer;
  private timerRes: any;//NodeJS.Timer;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.displayAns = false;
    this.answerSelected = null;
    this.timer = this.startTimer();
  }

  setRightAnswer() {
    this.rightAnswer =null;
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
    this.stop(this.timer);
    this.setRightAnswer();
    this.answerSelected = answer;
    this.selected.emit(answer);
    this.timerRes = this.startResTimer();//lancement du passage automatique (à la question suivante)
    this.displayAns = true;//affichage réponse donnée VS réponse attendue
  }

  nextQuestion(){
    this.stop(this.timerRes);
    if(this.answerSelected == null) this.selected.emit(null);//pour que soit intercept et sache --> rep enregistrée dans bd: null si non rep --> perte focus
    this.next.emit(true);
    this.init();
  }

  //n'a pas répondu --> passe à la réponse directement (permet de recapter attention)
  startTimer = () => setTimeout(() => {
    if(!this.displayAns){//au cas où timer zombie
      this.setRightAnswer();
      this.toggleAnswer();
      this.startResTimer();
    }
  }, this.TIME_OUT_VALUE);

  //passage automatique à la question suivante après avoir lu la réponse
  startResTimer = () => setTimeout(() => {
    if(this.displayAns) this.nextQuestion()}, //au cas où timer zombie
    this.TIME_OUT_ANS_VALUE);

  toggleAnswer = () => this.displayAns = !this.displayAns;

  //to stop timer and clear treatment
  stop = (timer: any) => {//NodeJS.Timer) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
}
