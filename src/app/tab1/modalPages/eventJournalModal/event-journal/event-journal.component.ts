import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GetObjectsService } from 'src/app/tab1/services/get-objects.service';
@Component({
  selector: 'app-event-journal',
  templateUrl: './event-journal.component.html',
  styleUrls: ['./event-journal.component.scss'],
})
export class EventJournalComponent implements OnInit {

  @Input() objectNum: number;
  eventArray: any;
  
  constructor(private mdlCntrl: ModalController, private getJournalService: GetObjectsService) { }

  ngOnInit() {
    console.log(this.objectNum);
    this.getJournalService.getObjectJournal(this.objectNum).subscribe(data=>{
      console.log(data);
      this.eventArray = data;
    })
  }
  async close(){
    await this.mdlCntrl.dismiss();
  }
}
