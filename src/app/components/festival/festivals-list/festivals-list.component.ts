import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Festival } from 'src/app/models/festival';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.sass']
})
export class FestivalsListComponent implements OnInit {
  constructor(public messageService: MessageService){

  }
  ngOnInit(): void {
    this.messageService.log("Message list initialized")
  }

  @Input() festivals: Festival[] = [];
  @Output() festivalSelected = new EventEmitter<Festival>();

  selectFestival(index: number){
    this.festivalSelected.emit(this.festivals[index]);
  }
}
