import{Injectable} from '@angular/core'
import{Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'


import { Addtocart } from '../classes/addtocart';
@Injectable()//declaring a class of type injectable
export class freeapiservice{
    url="https://bribchat.com:44369";//DRY principle
    //now we will inject the httpt client using the constuctor
    constructor(private httpclient: HttpClient){};

    //get all items in store
    getallitems(): Observable<any> {
        return this.httpclient.get(this.url+"/cat/all");
    }
    //get all items which belong to a perticular catagory eg swords only,shields only
    getItemCat(catagory): Observable<any> {
        return this.httpclient.get(this.url+"/cat/"+catagory);
    }
    //push an object with its object id into a user' cart
    addtocart(cartobj:Addtocart): Observable<any> {
        return this.httpclient.post(this.url+"/addtocart",cartobj);
    }

    //creates a new user session and returns a salted token for auth
    authUserUname(Uname:string):Observable<any> {
        return this.httpclient.post(this.url+"/createuser/"+Uname,Uname);
    }

    //get a user's cart given the salted token
    getCart(token:string): Observable<any> {
        return this.httpclient.get(this.url+"/getcart/"+token);
    }
}
