import { Component, OnInit } from '@angular/core';
import {Input,SimpleChanges,SimpleChange} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})


//master card is 5
//visa is 4
export class CreditCardComponent implements OnInit {

  @Input() _cardHolderName:string;
  @Input() _cardNumber:string;
  @Input() _cardExpDate:string;
  

  type:string;
  cardHolderName:string;
  cardNumber:string;
  cardType:string;
  cardExpDate:string;
  brand:string;
  style:string;
  bgSize:string;
  infoReady:boolean;

  constructor() { 
    this.type="Credit";
    this.cardHolderName="";
    this.cardNumber="";
    this.cardExpDate="";
    this.brand="../assets/visa.png";
   
    this.infoReady=false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
        

         if(this._cardHolderName.length>0)
         {
          this.cardHolderName=this._cardHolderName;
         }
        
         if(this._cardNumber.length>0)
         {
          this.infoReady=true;
          this.cardNumber=this._cardNumber;
         }
         
         if(this._cardExpDate.length>0)
         {
          this.cardExpDate=this._cardExpDate;
         }

        if(this.cardNumber[0]=='5')
        {
          this.brand="../assets/mastercard.png";
          if(this.cardNumber.length==19)
            {
              this.style='linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)';
              this.bgSize='400%';
            }
            else{
              this.style="grey";
            }
           
          
        }
        else
        {
          this.brand="../assets/visa.png";
          if(this.cardNumber.length==19)
            {
              this.style='linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)';
              this.bgSize='400%';
            }
            else{
              this.style="black";
            }
              
        }
  }

}
