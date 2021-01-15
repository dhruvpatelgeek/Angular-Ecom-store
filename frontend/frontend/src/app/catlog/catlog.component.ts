
/**
  * COMPONENT FOR DEBUGGED NOT TO BE EXPORTED
 */
import { Component, OnInit } from '@angular/core';

import{items} from './cat_type_cast/cat_class';
import {freeapiservice} from './cat_service/freeapi.service'

@Component({
  selector: 'app-catlog',
  templateUrl: './catlog.component.html',
  styleUrls: ['./catlog.component.css']
})

export class CatlogComponent{
  title="font";
  listItems:items[];
  _item:items;
  constructor(private _freeapiservice:freeapiservice){

  }

  ngOnInit(){
    this._freeapiservice.getallitems()
    .subscribe(
      (data)=>{
        this.listItems=data;
      }
    );
  }
}
