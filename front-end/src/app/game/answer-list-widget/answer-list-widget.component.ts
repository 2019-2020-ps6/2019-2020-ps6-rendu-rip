import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { Answer } from 'src/models/answer.model';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { GlobalService } from 'src/services/global.service';

const shazam = trigger('shazam', [
  state('zoomIn', style({ 
    transform: 'scale(1)',
    //opacity: 1,
    backgroundColor: 'rgb(38, 139, 255)'})),
  state('zoomOut', style({ 
    transform: 'scale(1.06)',
    //opacity: 0.8,
    backgroundColor: 'rgb(127, 74, 250)'})),
  transition('zoomIn <=> zoomOut', animate('1500ms ease-out'))//animate('1000ms 100ms linear'))
]);

@Component({
  selector: 'app-answer-list-widget',
  templateUrl: './answer-list-widget.component.html',
  styleUrls: ['./answer-list-widget.component.scss'],
  animations: [ shazam ]
})
export class AnswerListWidgetComponent implements OnInit{

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
  //timers initiaux mais vraies valeurs ensuite chargées via requete
  TIME_OUT_FOR_CHOSING_ANSWER: number = 200* GlobalService.second;
  TIME_OUT_DISPLAY_COMPARISON: number = 5* GlobalService.second;
  TIME_OUT_DISPLAY_NEXT_BUTTON: number = 3*GlobalService.second;

  SHOW_ANSWER_TO_CHOOSE: number = 0;
  SHOW_ANSWER_COMPARISON: number = 1;
  SHOW_RIGHT_ANSWER: number = 2;

  private timerToChooseAnswer: any;
  private timerDisplayComparison: any;
  private timerDisplayRightAnswer: any;

  //::::::::::::::shazam button::::::::::::::::::::
  private displayNextButton: boolean;

  TIME_OUT_SHAZAM_TRANSITION: number = 1500;//ms

  public zoom = 'zoomIn';

  public toggleScale() {
    this.zoom = this.zoom === 'zoomIn' ? 'zoomOut' : 'zoomIn';
  }
  
  private timerShazam: any;

  startTimerShazamTrans = () => setTimeout(() => {
    this.toggleScale();  
    this.timerShazam = this.startTimerShazamTrans();//again
    }
  , this.TIME_OUT_SHAZAM_TRANSITION);
  //::::::::::::::shazam button::::::::::::::::::::

  constructor(private elementRef: ElementRef, public globalService: GlobalService) {
    this.globalService.timers$.subscribe((timers) => {
      this.TIME_OUT_FOR_CHOSING_ANSWER = timers.timerToAnswer;
      this.TIME_OUT_DISPLAY_COMPARISON = timers.timerComparison;
      this.TIME_OUT_DISPLAY_NEXT_BUTTON = timers.timerRightAnswer;
      this.init();   
      this.initShazamTimer();
    })

    // Copy answers / Nécessaire pour le pop des questions
    if(this.answers) {
      this.answers = this.answers.map(e => ({ ... e }));
    }
  }

  initShazamTimer() {
    this.toggleScale();
    this.timerShazam = this.startTimerShazamTrans();
  }

  ngOnInit() {
    this.globalService.getTimers();
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

    if (!answer.isCorrect) this.wrongAnswerEvent.emit(answer);

    // Debut: Code pour pop les questions
    if (!answer.isCorrect && this.answers.length>2) {
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
      this.displayNextButton = false;
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
      this.displayNextButton = false;
      this.timerDisplayRightAnswer = this.startTimerDisplayRightAnswer();// on lance le timer correspondant
    }
  }
  , this.TIME_OUT_DISPLAY_COMPARISON);

  //timer before 'next' button shows
  startTimerDisplayRightAnswer = () => setTimeout(() => {
    this.displayNextButton = true;
    }
    , this.TIME_OUT_DISPLAY_NEXT_BUTTON);

  //passage à la question
  nextQuestion() {
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