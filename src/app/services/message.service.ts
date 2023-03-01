import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messageList: String[] = []

  constructor() { 
    console.log("message service instantiated")
  }

  log(message: string) {
    this.messageList.push(message);
  }

  clear(){
    this.messageList = [];
  }
}
