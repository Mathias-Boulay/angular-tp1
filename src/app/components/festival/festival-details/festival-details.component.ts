import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Festival } from 'src/app/models/festival';
import { FestivaljsonService } from 'src/app/services/festivaljson.service';
import { MessageService } from 'src/app/services/message.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-festival-details',
  templateUrl: './festival-details.component.html',
  styleUrls: ['./festival-details.component.sass'],
})
export class FestivalDetailsComponent implements OnChanges {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly route: ActivatedRoute,
    private readonly festivalService: FestivaljsonService
  ) {}

  @Input() public festival?: Festival;

  formGroup!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    this.updateFormFromFestival();
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('festivalId')) {
      const id = this.route.snapshot.paramMap.get('festivalId');
      this.festivalService.getFestival(id!).subscribe((fest) => {
        this.festival = fest;
        this.updateFormFromFestival();
      });
    } else {
      this.updateFormFromFestival();
    }
  }

  updateFormFromFestival() {
    if (!this.festival) {
      this.festival = new Festival('New festival', uuidv4());
    }

    this.formGroup = this.formBuilder.group({
      name: [this.festival.name],
      entrance: [this.festival.tableprice_1],
      room: [this.festival.tablebooked_2],
    });
  }

  validate() {
    if (!this.festival) {
      this.festival = new Festival('New festival', uuidv4());
    }

    this.festival!.name = this.formGroup.value.name;
    this.festival!.tableprice_1 = this.formGroup.value.entrance;
    this.festival!.sqmprice_1 = this.formGroup.value.room;

    this.messageService.log(
      `${this.festival!.name} - ${this.festival!.tableprice_1} - ${
        this.festival!.sqmprice_1
      }`
    );

    this.festivalService.addUpdateFestival(this.festival!);

    this.festival = undefined;
  }
}
