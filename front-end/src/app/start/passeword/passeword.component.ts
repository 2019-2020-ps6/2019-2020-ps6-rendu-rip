import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-passeword',
  templateUrl: './passeword.component.html',
  styleUrls: ['./passeword.component.scss']
})
export class PassewordComponent implements OnInit {


  public counter = 0;
  public loginForm: FormGroup;

  isnotCorrect = false;
  private data: {};

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      password : new FormControl('', [
        Validators.required
      ])
    });

  }


  ngOnInit() {
  }

  loginUser() {

    const password = this.loginForm.get('password').value;
    if (((password === '1111') || (password === '')) && (this.counter < 3)) {
      this.router.navigate(['staff']);
      this.isnotCorrect = false;
    } else {
      this.isnotCorrect = true;
      // tslint:disable-next-line: max-line-length
      if (this.counter === 2) { // if entered password 3 times wrong that means it's a user who want to acces and not a staff !!
      this.counter = 0; // reset on 0
      this.router.navigate(['home']); // redirect to home page

      } else {
         this.counter++;
        }
    }
  }


}