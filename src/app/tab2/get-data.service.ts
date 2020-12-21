import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  user: number;

  send_to_user;

  constructor(private http: HttpClient) { }

  getUsers(){
     return this.http.get("https://testmessager-2d4fb-default-rtdb.firebaseio.com/users.json");
  }
  
  getMessages(){
    return this.http.get("https://testmessager-2d4fb-default-rtdb.firebaseio.com/messages.json")
      .pipe(
        map(responseData => {
          const eventArray = [];
          for (const key in responseData){
            if(responseData.hasOwnProperty(key)){
              eventArray.push({...responseData[key], id: key});
            }
          }
          return eventArray;
        }))
  }

  sendMessage(message){
    this.http.post("https://testmessager-2d4fb-default-rtdb.firebaseio.com/messages.json", message ).subscribe(responseData =>{
      console.log(responseData);
    })
  }

  userLogin(id: number){
    this.user = id;
  }

  sendToUser(id){
    this.send_to_user = id;
  }

}
