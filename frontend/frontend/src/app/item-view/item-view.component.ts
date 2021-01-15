import { Component, OnInit } from '@angular/core';
import {freeapiservice} from '../service/freeapi.service';
import{items} from '../classes/items';
import { Subscription } from 'rxjs';

import { CommonService } from '../service/common.service';

import {Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {

  @Output() addtocart: EventEmitter<any>=new EventEmitter<any>();

  listItems:items[]; // associatve array of item objects
  _item:items; // single instance of item object
  userId:string; // salted token send by the server
  userName:string; // name entered by the user
  private subscription: Subscription; // subcription service from angular core

  constructor(private _freeapiservice:freeapiservice,
    private commonService: CommonService){

  }

  additem(id:string,name:string){

    this.addtocart.emit({"id":id,"name":name});
    
  }

  ngOnInit(): void {
    this._freeapiservice.getallitems()
    .subscribe(
      (data)=>{
        this.listItems=data;
      }
    );

    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      
      if (res.option === 'call_child') {
            this._freeapiservice.getItemCat(res.value)
            .subscribe(
                (data)=>{
                  this.listItems=data;
                 }
            );
      }
    });

   
  }


  

}
