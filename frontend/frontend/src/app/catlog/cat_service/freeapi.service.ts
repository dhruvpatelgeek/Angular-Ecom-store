import{Injectable} from '@angular/core'
import{Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
@Injectable()//declaring a class of type injectable
export class freeapiservice{

    //now we will inject the httpt client using thr constuctor
    constructor(private httpclient: HttpClient){};

    getallitems(): Observable<any> {
        return this.httpclient.get("http://localhost:3000/cat/all");
    }
}
