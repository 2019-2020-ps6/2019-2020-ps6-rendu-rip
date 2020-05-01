import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { Answer } from 'src/models/answer.model';

import { DOCUMENT } from '@angular/common'; 
import { trigger, state, transition, style, animate } from '@angular/animations';

const shazam = trigger('scale', [
  state('scaleIn', style({ transform: 'scale(1)' })),
  state('scaleOut', style({ transform: 'scale(1.1)' })),
  transition('scaleIn <=> scaleOut', animate('1000ms linear'))
]);

@Component({
  selector: 'app-answer-list-widget',
  templateUrl: './answer-list-widget.component.html',
  styleUrls: ['./answer-list-widget.component.scss'],
  animations: [ shazam ]
})
export class AnswerListWidgetComponent implements OnInit, AfterViewInit{

  public scale = 'scaleIn';

  public toggleScale() {
    this.scale = this.scale === 'scaleIn' ? 'scaleOut' : 'scaleIn';
  }
  /*
  // ...
  state('open', style({
    height: '200px',
    opacity: 1,
    backgroundColor: 'yellow'
  })),
  state('closed', style({
    height: '100px',
    opacity: 0.5,
    backgroundColor: 'green'
  })),
  */

  @Input()
  answers: Answer[];

  @Output()
  selected: EventEmitter<Answer> = new EventEmitter<Answer>();

  @Output()
  next: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  timeOutEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  wrongAnswerEvent: EventEmitter<Answer> = new EventEmitter<Answer>();

  answerSelected : Answer;
  display: number;
  //Pour la demo BESOIN de timers assez rapide...
  private second = 1000;//1s = 1000ms
  TIME_OUT_FOR_CHOSING_ANSWER: number = 10*this.second;//90*this.second;
  TIME_OUT_DISPLAY_COMPARISON: number = 5*this.second;
  TIME_OUT_DISPLAY_REAL_COMPARISON: number = 3*this.second;
  //TIME_OUT_DISPLAY_RIGHT_ANSWER: number = 1000*this.second;
  TIME_OUT_DISPLAY_NEXT_BUTTON: number = 3*this.second;

  SHOW_ANSWER_TO_CHOOSE: number = 0;
  SHOW_ANSWER_COMPARISON: number = 1;
  SHOW_RIGHT_ANSWER: number = 2;

  private timerToChooseAnswer: any;
  private timerDisplayComparison: any;
  private timerDisplayRightAnswer: any;
  
  private displayNextButton: boolean = false;
  private nextButton;
  constructor(private elementRef: ElementRef) {
    // Copy answers / Nécessaire pour le pop des questions
    if(this.answers) {
      this.answers = this.answers.map(e => ({ ... e }));
    }
  }

  ngAfterViewInit() {
    //this.nextButtonSetup();
  }

  /*nextButtonSetup() {
    window.addEventListener("load", this.setInitialClass, false);
    this.nextButton = this.elementRef.nativeElement.querySelector('nextButton');
    
    //this.nextButton.addEventListener("mouseover", this.setInitialClass, false);
    //this.nextButton.addEventListener('transitionend', this.loopTransition.bind(this));
    this.nextButton.addEventListener("transitionend", this.loopTransition, false);
    this.nextButton.addEventListener("webkitTransitionEnd", this.loopTransition, false);
    this.nextButton.addEventListener("mozTransitionEnd", this.loopTransition, false);
    this.nextButton.addEventListener("msTransitionEnd", this.loopTransition, false);
    this.nextButton.addEventListener("oTransitionEnd", this.loopTransition, false);
  }*/

  setInitialClass(e) {
    //e.target.className = "stateTwo";
    //this.nextButton.nativeElement.className = "stateTwo";
  }
      
  loopTransition(e) {
    if(e.propertyName == "opacity") {
      if(e.target.className == "stateTwo") {
        e.target.className = "stateOne";
      } else {
        e.target.className = "stateTwo";
      }
    }
    /*if(e.propertyName == "opacity") {
      if(this.nextButton.nativeElement.className == "stateTwo") {
        this.nextButton.nativeElement.className = "stateOne";
      } else {
        this.nextButton.nativeElement.className = "stateTwo";
      }
    }*/
  }

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

    if (answer.isCorrect==false) this.wrongAnswerEvent.emit(answer);

    // Debut: Code pour pop les questions
    if (answer.isCorrect==false && this.answers.length>2) {
      // On laisse la réponse erronée et la réponse vraie
      this.answers = this.answers.filter(a => a.isCorrect==true || a.id!==answer.id)
      this.timerToChooseAnswer = this.startTimerToChooseAnswer();//on relance le timer correspondant
      return
    }
    // Fin: Code pour pop les questions

    this.timerDisplayComparison = this.startTimerDisplayComparison();//on lance le timer de la Comparison
    this.answerSelected = answer;
    this.selected.emit(answer);//on renvoit la réponse choisie
    this.display = this.SHOW_ANSWER_COMPARISON;//affichage réponse donnée VS réponse attendue
  }

  //Timer pour choisir
  startTimerToChooseAnswer = () => setTimeout(() => {//à la fin du timeOut :
    this.timeOutEvent.emit(true);
    if(this.answerSelected == null) {
      this.display = this.SHOW_RIGHT_ANSWER;
      this.timerDisplayRightAnswer = this.startTimerDisplayRightAnswer();
    }
    else {
      this.display = this.SHOW_ANSWER_COMPARISON; //on affiche la suite
      this.timerDisplayComparison = this.startTimerDisplayComparison();// on lance le timer suivant
    }
  }
  , this.TIME_OUT_FOR_CHOSING_ANSWER);

  //timer pour afficher la COMPARISON
  startTimerDisplayComparison = () => setTimeout(() => {// à la fin du timeOut
    if(!this.answerSelected || this.answerSelected.isCorrect===true) this.nextQuestion();
    else{
      this.display = this.SHOW_RIGHT_ANSWER;// on affiche la bonne réponse
      this.timerDisplayRightAnswer = this.startTimerDisplayRightAnswer();// on lance le timer correspondant
    }
  }
  , this.TIME_OUT_DISPLAY_COMPARISON);

  //skip le timer de la COMPARISON
  skipComparison() {
    this.stop(this.timerDisplayComparison);
    //if(!this.answerSelected || this.answerSelected.isCorrect===true) 
    if(this.answerSelected && this.answerSelected.isCorrect===true) this.nextQuestion();
    else {
      this.display = this.SHOW_RIGHT_ANSWER;
      this.timerDisplayRightAnswer = this.startTimerDisplayRightAnswer();
    }
  }

  //timer before 'next' button shows
  startTimerDisplayRightAnswer = () => setTimeout(() => {
    this.displayNextButton = true;
    }
    , this.TIME_OUT_DISPLAY_NEXT_BUTTON);

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