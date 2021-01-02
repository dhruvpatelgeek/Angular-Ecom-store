import{Injectable} from '@angular/core'
import{Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'


import { Addtocart } from '../classes/addtocart';
@Injectable()//declaring a class of type injectable
export class freeapiservice{
    url="http://localhost:3000";//DRY principle
    //now we will inject the httpt client using thr constuctor
    constructor(private httpclient: HttpClient){};

    getallitems(): Observable<any> {
        return this.httpclient.get(this.url+"/cat/all");
    }

    getItemCat(catagory): Observable<any> {
        return this.httpclient.get(this.url+"/cat/"+catagory);
    }

    addtocart(cartobj:Addtocart): Observable<any> {
        return this.httpclient.post(this.url+"/addtocart",cartobj);
    }

    authUserUname(Uname:string):Observable<any> {
        return this.httpclient.post(this.url+"/createuser/"+Uname,Uname);
    }

    getCart(token:string): Observable<any> {
        return this.httpclient.get(this.url+"/getcart/"+token);
    }
}
