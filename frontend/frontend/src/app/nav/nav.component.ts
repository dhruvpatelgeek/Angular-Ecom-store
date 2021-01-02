import { Component, OnInit } from '@angular/core';
import {Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent implements OnInit {

  
  @Output() notify: EventEmitter<string>=new EventEmitter<string>();
  
  onClick(message:string):void{
    this.notify.emit(message);
  }


  constructor() {
    
   }

  ngOnInit(): void {
    
  }
  

}
