import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { ImageService } from 'src/services/image.service';
import { UserService } from 'src/services/user.service';
import { Img } from 'src/models/image.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;
  userImage: Img ={} as Img;

  constructor(public userService: UserService, public imageService: ImageService,
              public router: ActivatedRoute) {}

  ngOnInit() {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      if(this.user.imageId){
        this.imageService.loadUserImage(this.userImage,this.user.imageId);
      }
    });

    const userId = this.router.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(userId);
  }
}
