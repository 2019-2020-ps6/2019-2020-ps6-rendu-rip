import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-passeword',
  templateUrl: './passeword.component.html',
  styleUrls: ['./passeword.component.scss']
})
export class PassewordComponent implements OnInit {

  loginForm: FormGroup;
  isCorrect : boolean = true;
  counter : number = 0;

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
    this.counter++;
    let password = this.loginForm.get('password').value;
    if (password === '1111' || password === '') {
      this.router.navigate(['staff']);
      return;
    } 
    this.isCorrect = false;
    if (this.counter === 3) { // if entered password 3 times wrong that means it's a user who want to acces and not a staff !!
        this.counter = 0; // reset on 0
        this.router.navigate(['home']); // redirect to home page
    } 
  }


}