import { Component, OnInit } from '@angular/core';
import { CreditCardComponent } from '../credit-card/credit-card.component'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  name:string;
  number:string;
  date:string;
  constructor() {
    this.name='';
    this.number='';
    this.date='';
    
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
}
