import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalService } from 'src/services/modal.service';
import { AnswerListWidgetComponent } from 'src/app/game/answer-list-widget/answer-list-widget.component';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-timer-form-modal',
  templateUrl: './timer-form-modal.component.html',
  styleUrls: ['./timer-form-modal.component.scss']
})

export class TimerFormModalComponent implements OnInit {

  timerForm: FormGroup;
  
  constructor(private modalService : ModalService, public formBuilder: FormBuilder, public globalService:GlobalService) {
    globalService.getTimers()
  }

  ngOnInit() {
    this.initTimerForm();
  }


  initTimerForm(){
    this.timerForm = this.formBuilder.group({
        timerToAnswer: [AnswerListWidgetComponent.TIME_OUT_FOR_CHOSING_ANSWER/AnswerListWidgetComponent.second],
        timerComparison: [AnswerListWidgetComponent.TIME_OUT_DISPLAY_COMPARISON/AnswerListWidgetComponent.second],
        timerRightAnswer: [AnswerListWidgetComponent.TIME_OUT_DISPLAY_NEXT_BUTTON/AnswerListWidgetComponent.second]
      });
  }
  
  save(value : any, modal){
      let timerToAnswer:number, timerComparison:number, timerRightAnswer:number
      
      timerToAnswer = (value.timerToAnwer) ? value.timerToAnswer*AnswerListWidgetComponent.second : AnswerListWidgetComponent.TIME_OUT_FOR_CHOSING_ANSWER
      timerComparison = (value.timerComparison) ? value.timerComparison*AnswerListWidgetComponent.second : AnswerListWidgetComponent.TIME_OUT_DISPLAY_COMPARISON
      timerRightAnswer = (value.timerRightAnswer) ? value.timerRightAnswer*AnswerListWidgetComponent.second : AnswerListWidgetComponent.TIME_OUT_DISPLAY_NEXT_BUTTON
      this.globalService.updateTimers( timerToAnswer, timerComparison, timerRightAnswer )

      this.reset();
      modal.close();
  }

  reset(){
      this.timerForm.reset();
      this.initTimerForm();
  }
}