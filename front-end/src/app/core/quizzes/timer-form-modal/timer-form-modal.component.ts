import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalService } from 'src/services/modal.service';
import { AnswerListWidgetComponent } from 'src/app/game/answer-list-widget/answer-list-widget.component';

@Component({
  selector: 'app-timer-form-modal',
  templateUrl: './timer-form-modal.component.html',
  styleUrls: ['./timer-form-modal.component.scss']
})

export class TimerFormModalComponent implements OnInit {

  timerForm: FormGroup;
  
  constructor(private modalService : ModalService, public formBuilder: FormBuilder) {}

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
      console.log(value.timerToAnswer)
      if(value.timerToAnswer)AnswerListWidgetComponent.TIME_OUT_FOR_CHOSING_ANSWER=value.timerToAnswer*AnswerListWidgetComponent.second;
      if(value.timerComparison)AnswerListWidgetComponent.TIME_OUT_DISPLAY_COMPARISON = value.timerComparison*AnswerListWidgetComponent.second;
      if(value.timerRightAnswer)AnswerListWidgetComponent.TIME_OUT_DISPLAY_NEXT_BUTTON = value.timerRightAnswer*AnswerListWidgetComponent.second;
      this.reset();
      modal.close();
  }

  reset(){
      this.timerForm.reset();
      this.initTimerForm();
  }
}