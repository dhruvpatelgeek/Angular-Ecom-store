import { Component } from '@angular/core';
import {freeapiservice} from './service/freeapi.service';
import { CommonService } from './service/common.service';
import { Addtocart } from './classes/addtocart';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userAuth=false;
  userId='null';
  userName='null';
  title="font";
  checkout=false;
  constructor(private _freeapiservice:freeapiservice,
                private commonService: CommonService){
  }
 
  changePost(message:string){
    switch(message){

      case"logout":{
            this.userId='null';
            this.userName='null';
            this.userAuth=false;
            this.checkout=false;
      }
      break;

      case"checkout":{
        this.checkout=true;
      }
      break;
      default:
              {
                this.checkout=false;
                this.commonService.notifyOther({option: 'call_child', value: message});
                // call the child component to chnage the view
              }
    }
  
  }
  
  
  additem(req){
    var cartobj=new Addtocart;
    cartobj.object_id=req.id;
    cartobj.user_id=this.userId;
    cartobj.object_id_quantity=1;
    var name=req.name;

    this._freeapiservice.addtocart(cartobj)
    .subscribe(
      (data)=>{
        if(data)
        {
          alert("ADDED "+name+" to cart"+" for "+this.userName);
        }
        else
        {
          alert("transcation fail");
        }
      }
    );
  }

  authUser(uid:string){
      this._freeapiservice.authUserUname(uid)
      .subscribe(
        (data)=>{
          if(data.token=='null')
          {
            alert("try another username this one is in use");
          }
          else
          { 
            this.userName=uid;
            this.userId=data.token;
            this.userAuth=true;
            
          }
        }
      );
  }
  ngOnInit(){
    
    
  }

 
}
