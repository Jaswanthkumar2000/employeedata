import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent {
  title = 'employeeapp';
  login = new FormGroup({
    username:new FormControl("username ",[Validators.required, Validators.minLength(8), Validators.maxLength(10)])
  })
  show(){
    console.log(this.login)
  }
}; 
