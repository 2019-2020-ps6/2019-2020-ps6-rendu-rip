import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-add-thems-form',
  templateUrl: './add-thems-form.component.html',
  styleUrls: ['./add-thems-form.component.scss']
})
export class AddThemsFormComponent implements OnInit {

  @Input()
  THEME_LIST: string[];

  themeForm: FormGroup;
  
  @Output()
  themeAdded: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {

  }

  ngOnInit() {
    this.themeForm = this.formBuilder.group({
      valueToAdd: [''],
    });
  }



  okClicked(): void {
    const themeToCreate: string = this.themeForm.getRawValue() as string;
    console.log('la valeur de theme est : ' + themeToCreate.toString());
  }

  cancelClicked(): void {
    this.themeForm.reset();
    this.themeAdded.emit(false);
  }

  addToDataBaseClicked(): void {
  }


}
