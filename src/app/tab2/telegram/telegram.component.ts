import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.scss'],
})
export class TelegramComponent implements OnInit {
  
  secretKey = "YourSecretKeyForEncryption&Descryption";
  messageArray;
  messageToSend

  userId;
  send_to_user;

  array =  [];

  constructor(private getMessages: GetDataService) { 
    this.userId = this.getMessages.user;
    this.send_to_user = this.getMessages.send_to_user;
    
  }

  ngOnInit() {
    
    this.getMessages.getMessages().subscribe(messages =>{
      this.messageArray = messages;
      this.messageArray.forEach(element => {
        element.content = this.decrypt(element.content);
      });
    })
    console.log(this.messageArray);
    
  }

  update(){
    this.getMessages.getMessages().subscribe(messages =>{
      this.messageArray = messages;
      this.messageArray.forEach(element => {
        element.content = this.decrypt(element.content);
      });
    })
    console.log(this.messageArray);
  }

  send(message: string){
    if (message){
      message = this.encrypt(message);
      this.getMessages.sendMessage({
        "to_id": this.send_to_user,
        "from_id": this.userId,
        "content": message,
        "time": "11.00"
      });
      this.messageToSend = "";
      this.update();
    }
  }
  encrypt(value : string){
    return  CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return  CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
