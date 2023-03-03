import { Component } from '@angular/core';
import { Festival } from './models/festival';
import { FestivaljsonService } from './services/festivaljson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(private jsonService: FestivaljsonService) {}

  title = 'FestivalApp';
  festivals = this.jsonService.getFestivals();

  edittedFestival?: Festival;

  editFestival(festival: Festival) {
    this.edittedFestival = festival;
  }
}
