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
  // emmiter to go back to the main page

  listItems:items[]; // AA of items objs
  _item:items; // single instance of item obc
  total:number; // sum total of the cost of all the items added to cart
  showLoadingGif:boolean; // show spinning gif while loading
  constructor(private _freeapiservice:freeapiservice){
    this.showLoadingGif=false;
  }
  
  goBack(){
    this.retCheckout.emit("back"); // change the main DOM to main view
  }

/**
  * checks if cart is ready or not
 * @return {boolean} if cart is ready true else false
 */
  readyCart(){
    if(this.item.length<10) // is UID does not exist then the cart is not ready
      return false;
    else
      return true;
  }

  exit(){
    this.showLoadingGif=true;
    setTimeout(() => {
      this.retCheckout.emit("pay"); // fake checkout delay
    }, 2000);
  }

  /**
  * Sends and HTTP get request with token to retrive the cart data
 * @param {string} item- salted token given by the server
 */
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
