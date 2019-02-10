import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private message: any;
  private message2: any;
  private message3: any;
  private message4 = {};
  private message5 = false;
  private message6: any;
  private message7 = false;


  private messageSource = new BehaviorSubject <any>(this.message);
  currentMessage = this.messageSource.asObservable();

  private messageSource2 = new BehaviorSubject<any>(this.message2);
  currentMessage2 = this.messageSource2.asObservable();

  private messageSource3 = new BehaviorSubject<any>(this.message3);
    currentMessage3 = this.messageSource3.asObservable();

  private messageSource4 = new BehaviorSubject<any>(this.message4);
    currentMessage4 = this.messageSource4.asObservable();

    private messageSource5 = new BehaviorSubject<any>(this.message5);
    currentMessage5 = this.messageSource5.asObservable();

    private messageSource6 = new BehaviorSubject<any>(this.message6);
    currentMessage6 = this.messageSource6.asObservable();

    private messageSource7 = new BehaviorSubject<any>(this.message7);
    currentMessage7 = this.messageSource7.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  changeMessage2(message: any) {
    this.messageSource2.next(message);
  }

    changeMessage3(message: any) {
        this.messageSource3.next(message);
    }

    changeMessage4(message: any) {
        this.messageSource4.next(message);
    }

    changeMessage5(message: any) {
        this.messageSource5.next(message);
    }

    changeMessage6(message: any) {
        this.messageSource6.next(message);
    }

    changeMessage7(message: any) {
        this.messageSource7.next(message);
    }
}