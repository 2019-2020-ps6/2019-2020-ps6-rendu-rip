import { Component, OnInit } from '@angular/core';
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

  imageName: string;
  imagePreview: string;

  constructor(public formBuilder: FormBuilder, public imageService: ImageService, public userService: UserService) {
    // Form creation
    this.userForm = this.formBuilder.group({ name: [''] });
  }

  ngOnInit() {}

  reset(){
    this.userForm.reset()
    this.imagePreview = null;
    this.imageName = null;
  }

  addUser() {
    const usrToSave: User = this.userForm.getRawValue() as User;
    if(this.imagePreview){
      let imgToSave: Img = this.imgFillIn();
      console.log("User: saving with image...");
      this.userService.addUserWithImage(usrToSave, imgToSave);
    }
    else{
      console.log("User: saving...");
      this.userService.addUser(usrToSave);
    }
    this.reset();
  }

  imgFillIn(): Img {
    let image = {} as Img;
    image.name = this.imageName;
    image.url = this.imagePreview;
    return image;
  }

  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageName = file.name + " " + file.type;
        this.imagePreview = 'data:image;base64,' + (reader.result as string).split(',')[1];
        //(<string>reader.result).split or (reader.result as string).split
        console.log(this.imageName);
      };
    }
  }

  //sanitize necessary otherwise throw security error
  displayImage() { return this.imageService.sanitize(this.imagePreview); }
}
