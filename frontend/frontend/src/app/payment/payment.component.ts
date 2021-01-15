import { Component, OnInit } from '@angular/core';
import { CreditCardComponent } from '../credit-card/credit-card.component'
import {Input } from '@angular/core'; // First, import Input
import {Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() saltedToken: string; // salted userid returned by the server
  @Output() retCheckout: EventEmitter<string>=new EventEmitter<string>();
  name:string;
  number:string;
  date:string;
  showLoadingGif:boolean;
  cardValid:boolean;
  constructor() {
    this.name='';
    this.number='';
    this.date='';
    this.saltedToken='n/a';
    this.showLoadingGif=false;
    this.cardValid=false;
   }

  ngOnInit(): void {
  }

  sendName(event: any){
    this.name=event.target.value;
  }

  sendCardNum(event: any){
    var check=event.target.value;
    check=check.replaceAll(' ','');
    if(isNaN(check))
    {
      alert("not a valid card number");
      event.target.value='';

    }
    else{
      this.number=event.target.value;
    }
    if(event.target.value.length==4)
    {
      event.target.value+=' ';
    }
    if(event.target.value.length==9)
    {
      event.target.value+=' ';
    }
    if(event.target.value.length==14)
    {
      event.target.value+=' ';
    }

    if(event.target.value.length==19)
    {
      this.cardValid=true;
    }
    else{
      this.cardValid=false;
    }
    

  }

  sendExpDate(event:any){
    var check=event.target.value;
    check=check.replaceAll('/','');
    if(isNaN(check))
    {
      alert("not a valid card number");
      event.target.value='';

    }
    else{
      this.date=event.target.value;
    }
    if(event.target.value.length==2)
    {
      event.target.value+='/';
    }
  }

  exit(){
    this.showLoadingGif=true;
    setTimeout(() => {
      this.retCheckout.emit("logout");
    }, 2000);
  }
}
