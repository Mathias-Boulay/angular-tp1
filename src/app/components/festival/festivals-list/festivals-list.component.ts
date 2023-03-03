import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Festival } from 'src/app/models/festival';
import { FestivaljsonService } from 'src/app/services/festivaljson.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-festivals-list',
  templateUrl: './festivals-list.component.html',
  styleUrls: ['./festivals-list.component.sass'],
})
export class FestivalsListComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private readonly festivalService: FestivaljsonService
  ) {}

  @Input() festivals!: Festival[] | null;
  @Output() festivalSelected = new EventEmitter<Festival>();

  ngOnInit(): void {
    this.messageService.log('Message list initialized');
    if (!this.festivals) {
      this.festivalService.getFestivals().subscribe((fest) => {
        this.festivals = fest;
      });
    }
  }

  selectFestival(index: number) {
    this.festivalSelected.emit(this.festivals![index]);
  }
  deleteFestival(index: number) {
    this.festivalService.deleteFestival(this.festivals![index]);
  }
}
