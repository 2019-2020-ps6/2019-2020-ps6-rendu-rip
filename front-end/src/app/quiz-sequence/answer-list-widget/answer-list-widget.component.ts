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

  answerSelected : Answer;
  display: number;

  TIME_OUT_FOR_CHOSING_ANSWER: number = 10000;
  TIME_OUT_DISPLAY_COMPARAISON: number = 2000;
  TIME_OUT_DISPLAY_RIGHT_ANSWER: number = 5000;

  SHOW_ANSWER_TO_CHOOSE: number = 0;
  SHOW_ANSWER_COMPARISON: number = 1;
  SHOW_RIGHT_ANSWER: number = 2;

  private timerToChooseAnswer: any;
  private timerDisplayComparison: any;
  private timerDisplayRightAnswer: any;

  constructor() { }

  ngOnInit() {
    this.init();
  }
  ngOnChanges(){
    this.init();
  }
  //fonction appelée à chaque changement de question
  init(){
    this.answerSelected = null;//on réinitialise les timers et variables
    this.stop(this.timerToChooseAnswer);
    this.stop(this.timerDisplayComparison);
    this.stop(this.timerDisplayRightAnswer);
    this.display = this.SHOW_ANSWER_TO_CHOOSE;// on affiche le choix des réponses
    this.timerToChooseAnswer = this.startTimerToChooseAnswer();//on lance le timer correspondant
  }

  //Si une réponse est sélectionnée
  onAnswerSelected(answer: Answer) {
    this.stop(this.timerToChooseAnswer);
    this.timerDisplayComparison = this.startTimerDisplayComparison();//on lance le timer de la Comparison
    this.answerSelected = answer;
    this.selected.emit(answer);//on renvoit la réponse choisie
    this.display = this.SHOW_ANSWER_COMPARISON;//affichage réponse donnée VS réponse attendue
  }

  //Timer pour choisir
  startTimerToChooseAnswer = () => setTimeout(() => {//à la fin du timeOut :
    this.display = this.SHOW_ANSWER_COMPARISON; //on affiche la suite
    this.timerDisplayComparison = this.startTimerDisplayComparison();// on lance le timer suivant
  }
  , this.TIME_OUT_FOR_CHOSING_ANSWER);

  //timer pour afficher la comparaison
  startTimerDisplayComparison = () => setTimeout(() => {// à la fin du timeOut
      this.display = this.SHOW_RIGHT_ANSWER;// on affiche la bonne réponse
      this.timerDisplayRightAnswer = this.startTimerDisplayRightAnswer();// on lance le timer correspondant
  }
  , this.TIME_OUT_DISPLAY_COMPARAISON);

  //skip le timer de la comparaison
  skipComparison() {
    this.stop(this.timerDisplayComparison);
    this.display = this.SHOW_RIGHT_ANSWER;
    this.timerDisplayRightAnswer = this.startTimerDisplayRightAnswer();
  }

  //timer pour afficher que la bonne réponse
  startTimerDisplayRightAnswer = () => setTimeout(() => {// à la fin du timeout
    this.nextQuestion();// on demande à passer à la question suivante
    }
    ,this.TIME_OUT_DISPLAY_RIGHT_ANSWER);

  //passage à la question
  nextQuestion(){
    this.stop(this.timerDisplayRightAnswer);
    if(this.answerSelected === null) this.selected.emit(null);//pour que soit intercept et sache --> rep enregistrée dans bd: null si non rep --> perte focus
    this.next.emit(true);
    this.init();
  }

  //to stop timer and clear treatment
  stop = (timer: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
}