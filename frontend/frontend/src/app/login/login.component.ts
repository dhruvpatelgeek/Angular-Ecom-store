import { Component, OnInit } from '@angular/core';
import {Output,EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name='';

  @Output() loginUser: EventEmitter<string>=new EventEmitter<string>();

  login():void{
    if(this.name=='')
    {
      alert('Please Enter a non empty string');
    }
    else{
      this.loginUser.emit(this.name);
    }
   
  }

  constructor() { }

  ngOnInit(): void {
  }

}
