import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetObjectsService {

  constructor(private http: HttpClient) {}

  getObjects(){
    //return this.http.get("http://localhost:3000/objects");
    return this.http.get("https://guard-16025-default-rtdb.firebaseio.com/objects.json");
  }

  addNoteToJournalEvents(note: any, objectNum: number){
    this.http.post("https://guard-16025-default-rtdb.firebaseio.com/objects/"+ objectNum +"/eventJournal.json", note ).subscribe(responseData =>{
      console.log(responseData);
    })
  }

  getObjectJournal(objectNum: number){
    return this.http.get("https://guard-16025-default-rtdb.firebaseio.com/objects/" + objectNum + "/eventJournal.json")
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
}
