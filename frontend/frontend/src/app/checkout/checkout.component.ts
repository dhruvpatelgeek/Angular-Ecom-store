import { Component, OnInit } from '@angular/core';
import {freeapiservice} from '../service/freeapi.service';
import {Output,EventEmitter} from '@angular/core';

import{items} from '../classes/items';


import {Input } from '@angular/core'; // First, import Input

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() item: string; // decorate the property with @Input()
  @Output() retCheckout: EventEmitter<string>=new EventEmitter<string>();

  listItems:items[];
  _item:items;
  total:number;
  showLoadingGif:boolean;
  constructor(private _freeapiservice:freeapiservice){
    this.showLoadingGif=false;
  }
  
  goBack(){
    this.retCheckout.emit("back");
  }


  readyCart(){
    if(this.item.length<10)
      return false;
    else
      return true;
  }

  exit(){
    this.showLoadingGif=true;
    setTimeout(() => {
      this.retCheckout.emit("pay");
    }, 2000);
  }

  pullCart(item){
    this._freeapiservice.getCart(item)
    .subscribe(
      (data)=>{
        this.listItems=data.cart;
        this.total=data.total;
      }
    );
  }
  ngOnInit(): void {

    if(this.item!="null")
    {
      this.pullCart(this.item);
    }
  }

  
}
