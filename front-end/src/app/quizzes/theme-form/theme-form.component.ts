import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})

export class ThemeFormComponent implements OnInit {

  themeForm: FormGroup;
  
  @Output()
  themeAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public formBuilder: FormBuilder, public themeService: ThemeService) {}

  ngOnInit() {
    this.themeForm = this.formBuilder.group({
      name: [''],
    });
  }

  saveTheme(): void {
    const themeToAdd: Theme =  this.themeForm.getRawValue() as Theme;
    this.themeService.addTheme(themeToAdd);
    this.themeAdded.emit(true);
    console.log(`la valeur de theme est : ${themeToAdd}`);
  }

  cancel(){
    this.themeAdded.emit(false);
  }
}
