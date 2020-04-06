import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-thems-form',
  templateUrl: './add-thems-form.component.html',
  styleUrls: ['./add-thems-form.component.scss']
})
export class AddThemsFormComponent implements OnInit {

  @Input()
  THEME_LIST: String[];

  themeForm: FormGroup;
  
  @Output()
  themeAdded: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(public formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.themeForm = this.formBuilder.group({
      valueToAdd: [''],
    });
  }

  okClicked(): void {

  }

  cancelClicked(): void {
    this.themeForm.reset();
    this.themeAdded.emit(false);
  }

  addToDataBaseClicked(): void {
  }


}
