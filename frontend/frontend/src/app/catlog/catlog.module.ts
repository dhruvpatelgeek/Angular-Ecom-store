import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{items} from './cat_type_cast/cat_class';
import {freeapiservice} from './cat_service/freeapi.service'




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [freeapiservice,
    items
    ],
})


export class CatlogModule { }
