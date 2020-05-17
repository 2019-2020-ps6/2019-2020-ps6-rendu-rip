import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';
import { Theme } from 'src/models/theme.model';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})

export class ThemeFormComponent implements OnInit {

  themeForm: FormGroup;
  
  @Output()
  themeAdded: EventEmitter<String> = new EventEmitter<String>();

  constructor(public modalService : ModalService, public formBuilder: FormBuilder, public themeService: ThemeService) {}

  ngOnInit() {
    this.themeForm = this.formBuilder.group({
      name: [''],
    });
  }

  saveTheme(): void {
    const themeToAdd: Theme =  this.themeForm.getRawValue() as Theme;
    if(themeToAdd.name===""){
      this.cancel();
      return;
    }
    this.themeService.addTheme(themeToAdd);
    this.themeAdded.emit(themeToAdd.name);
    this.reset();
  }

  reset(){
    this.themeForm.reset();
  }

  cancel(){
    this.themeAdded.emit("");
    this.reset();
  }
}
