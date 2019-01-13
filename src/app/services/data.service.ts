import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private message: any;
  private message2: any;
  private message3: any;


  private messageSource = new BehaviorSubject <any>(this.message);
  currentMessage = this.messageSource.asObservable();

  private messageSource2 = new BehaviorSubject<any>(this.message2);
  currentMessage2 = this.messageSource2.asObservable();

  private messageSource3 = new BehaviorSubject<any>(this.message3);
    currentMessage3 = this.messageSource3.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  changeMessage2(message2: any) {
    this.messageSource2.next(message2);
  }

    changeMessage3(message3: any) {
        this.messageSource3.next(message3);
    }
}