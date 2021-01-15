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
  banner=false;   // bool to control the notifications
  userAuth=false; // bool to see if user is auth or not
  userId='null';  // salted user id retunred by the server
  userName='null'; // username enteredby the user to be sent to the server
  title="font";   //legacy[223]
  checkout=false; // bool to control checkout DOM
  refreshFloatCart=0;// force cart refresh after adding an item
  pay=false; // bool to control payment DOM

  constructor(private _freeapiservice:freeapiservice, //HTTPS GET REQ PORT TO MY SERVER
                private commonService: CommonService){ // USED TO COMMUNATE BETWEEN CHILD COMPONENTS
  }
 
/**
 * @param {string} message - controls the main DOM structure
 */
  changePost(message:string){ // CASE STATEMENT TO MANUPULATE MAIN DOM VIEW
    switch(message){

      case"logout":{
            this.userId='null';
            this.userName='null';
            this.userAuth=false;
            this.checkout=false;
            this.refreshFloatCart=0;
            alert("transcation complete- THANK YOU FOR SHOPPING");// dummy purchace;
            window.location.reload();
            break;
      }
      

      case"checkout":{
        this.checkout=true;
        this.pay=false;
        break;
      }

      case"pay":{
        this.checkout=false;
        this.pay=true;
        break;
      }

      default:
              {
                this.checkout=false;
                this.commonService.notifyOther({option: 'call_child', value: message});
                // call the child component to chnage the view
              }
    }
  
  }
  
  /**
  * Sends and HTTP post request with object id and user id to append user's cart
 * @param {string} req - pushes the object into the users cart
 */
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
          this.banner=true;
          
          var timer=setTimeout(()=>{
            this.banner=false;
          },2000);

          this.refreshFloatCart++;
        }
        else
        {
          alert("transcation fail");
        }
      }
    );
  }

/**
  * Sends and HTTP post request with user name.
 * @param {string} uid- username entered by the user
 * @returns {string} userId- salted token returned by the server for auth
 */
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
