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

  @Input() _saltedtoken: string; // decorate the property with @Input()
  cartStatus:boolean;
  listItems:items[];
  _item:items;
  total:number;
  empty:boolean;

  constructor(private _freeapiservice:freeapiservice){
    this.empty=true;
    this.cartStatus=false;
  }

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

  

  ngOnInit(): void {
    this.pullCart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pullCart();
  }

}
