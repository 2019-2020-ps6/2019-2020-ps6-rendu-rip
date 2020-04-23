import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
  public userForm: FormGroup;
  public urlForm: FormGroup
  modalOptions:NgbModalOptions;


  @Input()
  user : User;
  @Input()
  userImage : Img;

  @Output()
  quitForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  imageTemporaire : Img = {} as Img;
  gallery : Img[] = [];

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, public imageService: ImageService, public userService: UserService) {
  }

  ngOnInit() {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
    this.initUserForm();
    this.initUrlForm();
    this.imageService.loadAllQuizImages(this.gallery);
  }

  initUserForm(){
    if(!this.user) this.userForm = this.formBuilder.group({name: ['']});
    else this.userForm = this.formBuilder.group({name: [this.user.name]});
  }

  initUrlForm() {
    this.urlForm = this.formBuilder.group({url: ""});
  }

  addOrUpdateUser() {
    const userToSave: User = this.userForm.getRawValue() as User;
    if(this.userService.userInvalid(userToSave))return;
    if(this.user) userToSave.id = this.user.id;
    if(this.imageTemporaire.url){
      if(this.user) this.userService.updateUserWithImg(userToSave, this.imageService.imageFillIn(this.imageTemporaire));
      else this.userService.addUserWithImage(userToSave, this.imageService.imageFillIn(this.imageTemporaire));
    }
    else{
      if(this.user) this.userService.updateUser(userToSave);
      else this.userService.addUser(userToSave);
    }
    if(!this.user)this.reset();
    this.quitForm.emit(false);
  }

  open(content) {
    this.modalService.open(content, this.modalOptions);
  }

  onUrlClicked(modal) {
    this.imageService.onUrlClicked(modal,this.imageTemporaire,this.urlForm.getRawValue().url)
  }
 
  reset(){
    this.userForm.reset()
    this.imageTemporaire = {} as Img;
    this.initUserForm();
    this.quitForm.emit(false);
  }
}
