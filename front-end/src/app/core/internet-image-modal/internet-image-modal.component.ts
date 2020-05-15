import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-internet-image-modal',
  templateUrl: './internet-image-modal.component.html',
  styleUrls: ['./internet-image-modal.component.scss']
})
export class InternetImageModalComponent implements OnInit {

  @Input()
  imageTmp : Img;
  @Input()
  id : string;
  urlForm: FormGroup;
  @Output() onChangeFile_bis: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    constructor(public formBuilder: FormBuilder,private modalService: ModalService, public imageService : ImageService){}

    ngOnInit(){
      this.initUrlForm();
      if(!this.id) this.id = "";
    }

    initUrlForm() {
      this.urlForm = this.formBuilder.group({url: "",});
    } 

    onUrlClicked(modal) {
      this.imageService.onUrlClicked(modal,this.imageTmp,this.urlForm.getRawValue().url)
      this.urlForm.reset();
      this.onChangeFile_bis.emit(true);
    }
}