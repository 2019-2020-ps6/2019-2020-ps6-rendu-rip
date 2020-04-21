import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/models/user.model';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/services/image.service';
import { UserService } from 'src/services/user.service';
import { Img } from 'src/models/image.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public saveAll$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public resetAll$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userForm: FormGroup;
  user: User;
  userImage: Img;
  imagePreviewUser: string;
  imagePreviewName: string;

  constructor(public formBuilder: FormBuilder, private http: HttpClient,
              public userService: UserService, public imageService: ImageService,
              public router: ActivatedRoute) {
               }

  ngOnInit() {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.loadImage();
      this.initializenUserForm();
    });

    const userId = this.router.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(userId);
  }


  initializenUserForm() {
    this.userForm = this.formBuilder.group({
      name : [this.user.name]
    });
  }

  private onceAllIsLoaded(): void {
    this.initializenUserForm();
  }

  loadImage() {
    this.userImage = {} as Img;
    if (this.user) {
      const id = this.user.imageId;
      if (id != null) {
        this.imageService.loadUserImage(this.userImage, id);
      }
    }
  }

  imgFillIn(): Img {
    const image = {} as Img;
    image.name = this.imagePreviewName;
    image.url = this.imagePreviewUser;
    return image;
  }

  submitUser(): void {

    const userToSave: User = this.userForm.getRawValue() as User;
    console.log(userToSave);
    userToSave.id = this.user.id;

    if (this.imagePreviewUser) {
        const imgToSave: Img = this.imgFillIn();
        this.userService.updateUserWithImg(userToSave, imgToSave);
      } else {
        console.log("Hello");
        this.userService.updateUser(userToSave);
    }
    // this.router.navigate(['staff']);
  }

  onChangeFile(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreviewName = file.name + ' ' + file.type;
        this.imagePreviewUser = 'data:image;base64,' + (reader.result as string).split(',')[1];
      };
    }
  }

  cancelUser() {
    this.userForm.reset();
    this.userImage = null;
    this.imagePreviewUser = null;
    this.imagePreviewName = null;
    this.initializenUserForm();
  }

  getImgSrcUser() {
    if (this.imagePreviewUser) {
      return this.imageService.sanitize(this.imagePreviewUser);
    }
    return this.imageService.sanitize(this.userImage.url);
  }

}
