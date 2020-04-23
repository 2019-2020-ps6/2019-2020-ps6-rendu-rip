import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from '../../../models/user.model';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  @Input() user: User;
  @Output() userDeleted: EventEmitter<User> = new EventEmitter<User>();
  image: Img;

  constructor(public userService : UserService, public imageService : ImageService) {}

  ngOnInit() { this.loadImage(); }

  loadImage(){
    this.image = {} as Img;
    const id = this.user.imageId;
    if(!id) return;
    this.imageService.loadUserImage(this.image, id);
  }

  deleteUser() { this.userDeleted.emit(this.user); }
}
