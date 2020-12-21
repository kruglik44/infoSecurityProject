import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/tab2/get-data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent 
{

 
  constructor(private http: HttpClient,
              private setRoleService: GetDataService,
              private router: Router) {
  }
  
  email: string;
  password: string;


  yagFaceId = "209b3bf2-a23c-42a0-ae73-98e886a10444";
  krugFaceId = "36fd3b98-634a-4573-829f-54934169aa2e";


  currentVar;
  myHeader;
  data = {
    "url": "https://sun9-70.userapi.com/impf/2EM9J_yGFTBgV7tm4ttpF-KM0_hWBbN3lON-Cg/5L5rkwnfmcU.jpg?size=961x1280&quality=96&proxy=1&sign=43a1b4950d4480418f31ea1b15b68d9f&type=album"
  };
  image = {
    "url": ""
  }

  createList(){
    console.log(this.myHeader);
    this.http.get("https://dmitrykruglov.cognitiveservices.azure.com/face/v1.0/facelists/1?returnRecognitionModel=false"
    , {headers: {'Ocp-Apim-Subscription-Key':'d6c119b4794a4929b94dc8c75a60c24c', 'Host': 'dmitrykruglov.cognitiveservices.azure.com' }}).subscribe(data => {
      console.log(data);
    })
  }
  sendPhoto(){
    this.http.post("https://dmitrykruglov.cognitiveservices.azure.com/face/v1.0/facelists/1/persistedFaces?userData=Dima_Kruglov&detectionModel=detection_01", this.data,  {headers: {'Ocp-Apim-Subscription-Key':'d6c119b4794a4929b94dc8c75a60c24c', 'Host': 'dmitrykruglov.cognitiveservices.azure.com', 'Content-Type': 'application/json'}})
      .subscribe(response => {
        console.log(response);
      })
  }

  sendPhotoToCheck(){
    this.http.post("https://dmitrykruglov.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_03&returnRecognitionModel=false&detectionModel=detection_02&faceIdTimeToLive=86400", this.image,  {headers: {'Ocp-Apim-Subscription-Key':'d6c119b4794a4929b94dc8c75a60c24c', 'Host': 'dmitrykruglov.cognitiveservices.azure.com', 'Content-Type': 'application/json'}})
      .subscribe(response => {
        console.log(response[0].faceId );
        this.currentVar = response[0].faceId;
        let checkImage = {
          "faceId": this.currentVar,
          "faceListId": "1",
          "maxNumOfCandidatesReturned": 10,
          "mode": "matchPerson"
        }
        this.http.post("https://dmitrykruglov.cognitiveservices.azure.com/face/v1.0/findsimilars", checkImage, {headers: {'Ocp-Apim-Subscription-Key':'d6c119b4794a4929b94dc8c75a60c24c', 'Host': 'dmitrykruglov.cognitiveservices.azure.com', 'Content-Type': 'application/json'}})
        .subscribe(result => {
          console.log(result[0].persistedFaceId, result[0].confidence);
          if (result[0].persistedFaceId == this.yagFaceId  && this.email == "admin1337" && this.password =="admin1337"){
            console.log("login as Dima Yagodarov");
            this.image.url = "";
            this.password = "";
            this.email = "";
            this.setRoleService.userLogin(2);
            this.router.navigate(['tabs/tab3']);
            
          }
          else if (result[0].persistedFaceId == this.krugFaceId && this.email == "dima4444" && this.password =="dima4444"){
            console.log("login as Dima Kruglov");
            this.image.url = "";
            this.password = "";
            this.email = "";
            this.setRoleService.userLogin(1);
            this.router.navigate(['tabs/tab3']);
          }
          else {
            alert("Wrong credentials");
            this.image.url = "";
            this.password = "";
            this.email = "";
          }

        });
      })
  }
  

  login(){
    this.sendPhotoToCheck();
  }
}
