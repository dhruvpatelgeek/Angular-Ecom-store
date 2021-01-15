import { Component, OnInit } from '@angular/core';
import {freeapiservice} from '../service/freeapi.service';
import{items} from '../classes/items';
import {Input } from '@angular/core'; // First, import Input
import { SimpleChanges } from '@angular/core';
import {Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.css']
})
export class ReciptComponent implements OnInit {

  @Input() _saltedtoken: string; // auth token used to complete the payment procress
  cartStatus:boolean; // show current cart status
  listItems:items[]; // list of all the items in cart returned by the user
  _item:items; // a single item object used for iteration
  total:number; // total cost of all the items in the cart
  empty:boolean; // if the cart is empty or not

  /**
 * Instantiate the freeapiservice object 
 */
  constructor(private _freeapiservice:freeapiservice){
    this.empty=true;
    this.cartStatus=false;
  }

/**
 * Returns an associative array of user's cart
 * @returns {item[]}
 */
  pullCart(){
    if(this._saltedtoken.length<10)
    {
      this.empty=true;
    }
    else{
      this._freeapiservice.getCart(this._saltedtoken)
    .subscribe(
      (data)=>{
        this.listItems=data.cart;
        this.total=data.total;
        if(this.listItems.length==0)
        {
          this.empty=true;
        }
        else{
          this.empty=false;
        }
      }
    );
    }
  }

  
/**
 * pull cart on initialization
 */
  ngOnInit(): void {
    this.pullCart();
  }

  /**
 * pull cart on any changes
 */
  ngOnChanges(changes: SimpleChanges) {
    this.pullCart();
  }

}
