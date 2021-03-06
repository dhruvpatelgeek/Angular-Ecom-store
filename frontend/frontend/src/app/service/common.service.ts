import { Injectable, Inject } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable()
export class CommonService {
  private notify = new Subject<any>();
  /**
   * Observable string streams
   * to communicate between two different child components
   */
  notifyObservable$ = this.notify.asObservable();

  constructor(){}

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
}