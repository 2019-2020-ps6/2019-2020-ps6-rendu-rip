import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalService } from 'src/services/modal.service';
import { AnswerListWidgetComponent } from 'src/app/game/answer-list-widget/answer-list-widget.component';
import { GlobalService } from 'src/services/global.service';
import { TimerConfig } from 'src/models/timerconfig.model';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer-form-modal',
  templateUrl: './timer-form-modal.component.html',
  styleUrls: ['./timer-form-modal.component.scss']
})

export class TimerFormModalComponent implements OnInit {

  timerForm: FormGroup;
  timers : TimerConfig;
  
  constructor(private modalService : ModalService, public formBuilder: FormBuilder, public globalService:GlobalService) {
    this.globalService.timers$.subscribe((timers) => {
      this.timers = timers;
      this.initTimerForm(this.timers);
    })
  }

  ngOnInit() {
    this.globalService.getTimers();
  }


  initTimerForm(timers : TimerConfig){
    this.timerForm = this.formBuilder.group({
        timerToAnswer: [timers.timerToAnswer/GlobalService.second],
        timerComparison: [timers.timerComparison/GlobalService.second],
        timerRightAnswer: [timers.timerRightAnswer/GlobalService.second]
      });
  }
  
  save(){
      let timersToUpdate = this.timerForm.getRawValue() as TimerConfig;
      timersToUpdate.timerToAnswer = timersToUpdate.timerToAnswer * GlobalService.second;
      timersToUpdate.timerComparison = timersToUpdate.timerComparison * GlobalService.second;
      timersToUpdate.timerRightAnswer = timersToUpdate.timerRightAnswer * GlobalService.second;
      this.globalService.updateTimers(timersToUpdate);
  }

  reset(){
      this.timerForm.reset();
      this.initTimerForm(this.timers);
  }
}