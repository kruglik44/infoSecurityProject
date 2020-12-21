import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { GetDataService } from './get-data.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  message: string;
  cryptedMessage: string;
  decryptedMessage: string;
  secretKey = "YourSecretKeyForEncryption&Descryption";
  usersArray;

  userId;
  constructor(private getService: GetDataService,
              private Router: Router) { 
    this.getService.getUsers().subscribe(users =>{
      console.log(users);
      this.usersArray = users;
      this.userId = this.getService.user;
      this.usersArray.splice(this.userId - 1 , 1);
    });
    console.log(this.getService.user);
  }
  goToTelegram(id){
    this.Router.navigate(["/tabs/tab2/telegram"]);
    this.getService.sendToUser(id);
  }
  
}
