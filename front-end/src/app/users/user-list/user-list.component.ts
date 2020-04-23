import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  showForm : boolean = false;
  modalOptions:NgbModalOptions;

  

  constructor(private modalService: NgbModal, public userService: UserService) {
    this.userService.users$.subscribe((user) => this.userList = user);
  }

  ngOnInit() {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  switchShowForm(show : boolean){
    this.showForm = show;
  }

  open(content) {
    this.modalService.open(content, this.modalOptions);
  }
  deleteUser(user: User) { this.userService.deleteUser(user); }

}
