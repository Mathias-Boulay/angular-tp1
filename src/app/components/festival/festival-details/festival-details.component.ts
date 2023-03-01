import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Festival } from 'src/app/models/festival';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.sass']
})
export class FestivalDetailsComponent implements OnChanges {

  constructor(private readonly formBuilder: FormBuilder, private readonly messageService: MessageService){}
  
  
  @Input() public festival?: Festival;

  formGroup!: FormGroup

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.festival) return;

    this.formGroup = this.formBuilder.group({
      name: [this.festival.name],
      entrance: [this.festival.tableprice_1],
      room: [this.festival.tablebooked_2]
    });
  }

  validate() {
    this.festival!.name = this.formGroup.value.name
    this.festival!.tableprice_1 = this.formGroup.value.entrance
    this.festival!.sqmprice_1 = this.formGroup.value.room

    this.messageService.log(`${this.festival!.name} - ${this.festival!.tableprice_1} - ${this.festival!.sqmprice_1}`);
    this.festival = undefined
  }
    
}
