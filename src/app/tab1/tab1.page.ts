import { Component } from '@angular/core';
import { EventJournalComponent } from './modalPages/eventJournalModal/event-journal/event-journal.component';
import { GetObjectsService } from './services/get-objects.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  objectsArray: any = [];
  cardArray = [];
  currentStatusArray =[]
  
  constructor(public objectService: GetObjectsService, 
              public modalController: ModalController,
              public alertController: AlertController)
  {
    this.objectService.getObjects().subscribe((response) =>{
      this.objectsArray = response;
      for (let i = 0; i < this.objectsArray.length; i++) {
        this.cardArray[i] = false;
      }    
    })
  }

  getClassByStatus(status: string){
    switch(status){
      case "Исправен": 
        return 'acting-project';
      case "Тревога":
        return 'span-project-expired';
      case "Неисправен":
        return 'status-grey';
    }
  }
  toggleCard(num: number){
    this.cardArray[num] = !this.cardArray[num];
  }
  async presentModal(num: number) {
    const modal = await this.modalController.create({
      component: EventJournalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'objectNum': num,
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      const user = data; // Here's your selected user!
      console.log(user);
  });
    return await modal.present();
  }
  openEventJournalModal(num: number){
    this.presentModal(num);
  }
  async presentAlert(headerMsg: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerMsg,
      message: msg,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm(headerMsg: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerMsg,
      message: msg,
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Принять',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  onGuard(num: number){
    if(this.objectsArray[num].state == "Тревога"){
      this.presentAlert("Внимание, тревога!", "Невозможно поставить объект на охрану");
      return;
    }
    if(this.objectsArray[num].state == "Неисправен"){
      this.presentAlert("Внимание, объект неисправен!", "Невозможно поставить объект на охрану");
      return;
    }
    this.objectService.addNoteToJournalEvents({
      "state": "Поставлен на охрану",
      "date": "12.01.2021",
      "time": "22:00"      
    }, num);
  }

  offGuard(num: number){
    this.objectService.addNoteToJournalEvents({
      "state": "Снят с охраны",
      "date": "18.01.2021",
      "time": "14:23"      
    }, num);
  }
}
