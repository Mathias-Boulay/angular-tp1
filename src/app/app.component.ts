import { Component } from '@angular/core';
import { Festival } from './models/festival';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'FestivalApp';
  festivals = [
    new Festival("toto"),
    new Festival("titi"),
    new Festival("tata"),
  ]

  edittedFestival?: Festival;

  editFestival(festival: Festival){
    this.edittedFestival = festival;
  }
}
