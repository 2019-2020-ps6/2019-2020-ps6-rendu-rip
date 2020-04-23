import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
  public userForm: FormGroup;

  @Input()
  user : User;
  @Input()
  userImage : Img;

  imageTemporaire : Img = {} as Img;

  constructor(public formBuilder: FormBuilder, public imageService: ImageService, public userService: UserService) {
  }

  ngOnInit() {this.initUserForm();}

  initUserForm(){
    if(!this.user) this.userForm = this.formBuilder.group({ 
      name: ['']
    });
    else{
      this.userForm = this.formBuilder.group({ 
        name: [this.user.name]
      });
    }
  }  

  addUser() {
    const userToSave: User = this.userForm.getRawValue() as User;
    if(this.userService.userInvalid(userToSave))return;
    if(this.imageTemporaire.name){
      this.userService.addUserWithImage(userToSave, this.imageService.imageFillIn(this.imageTemporaire));
    }
    else{
      this.userService.addUser(userToSave);
    }
    this.reset();
  }

  updateUser() {
    const userToSave: User = this.userForm.getRawValue() as User;
    if(this.userService.userInvalid(userToSave))return;
    userToSave.id = this.user.id;
    if (this.imageTemporaire.name) {
        this.userService.updateUserWithImg(userToSave, this.imageService.imageFillIn(this.imageTemporaire));
      } 
    else {
      this.userService.updateUser(userToSave);
    }
  }

  reset(){
    this.userForm.reset()
    this.imageTemporaire = {} as Img;
    this.initUserForm();
  }

}
