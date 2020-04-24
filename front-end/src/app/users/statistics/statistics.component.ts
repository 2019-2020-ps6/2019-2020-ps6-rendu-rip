import { Component, OnInit } from '@angular/core';
import { AttemptService } from 'src/services/attempt.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { ImageService } from 'src/services/image.service';
import { User } from 'src/models/user.model';
import { Img } from 'src/models/image.model';
import { Attempt } from 'src/models/attempt.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  user: User;
  userImage: Img ={} as Img;
  userAttempts: Attempt[] = [];

  constructor(public userService: UserService, public imageService: ImageService, 
              public router: ActivatedRoute, public attemptService: AttemptService) { }

  ngOnInit() {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      if(this.user.imageId){
        this.imageService.loadUserImage(this.userImage,this.user.imageId);
      }
      this.attemptService.getUserAttempts(user.id,this.userAttempts);
    });

    const userId = this.router.snapshot.paramMap.get('userId');
    this.userService.setSelectedUser(userId);
  }

}
