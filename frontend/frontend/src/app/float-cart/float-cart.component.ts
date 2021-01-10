import { Component, OnInit } from '@angular/core';
import {freeapiservice} from '../service/freeapi.service';
import{items} from '../classes/items';
import {Input } from '@angular/core'; // First, import Input
import { SimpleChanges } from '@angular/core';

import {Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-float-cart',
  templateUrl: './float-cart.component.html',
  styleUrls: ['./float-cart.component.css']
})
export class FloatCartComponent implements OnInit {

  @Input() item: string; // decorate the property with @Input()
  @Input() refresh: number; // decorate the property with @Input()
  

  @Output() notify: EventEmitter<string>=new EventEmitter<string>();

  cartStatus:boolean;
  listItems:items[];
  _item:items;
  total:number;
  empty:boolean;

  constructor(private _freeapiservice:freeapiservice){
    this.empty=true;
    this.cartStatus=false;
  }

 
  ngOnInit(): void {
    this.empty=true;
    this.pullCart();
  }

  pullCart(){
    if(this.item.length<10)
    {
      this.empty=true;
    }
    else{
      this._freeapiservice.getCart(this.item)
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

  readyCart(){

    if(this.item!="null")
      return false;
    else
      return true;
  }

  toggleCart(){
    if(this.cartStatus==true)
    {
      this.cartStatus=false;

    }
    else{
      if(this.listItems.length!=0)
      {
        this.cartStatus=true;
      }
    }
  }

  exit(){
    this.notify.emit("checkout");
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pullCart();
  }

}
