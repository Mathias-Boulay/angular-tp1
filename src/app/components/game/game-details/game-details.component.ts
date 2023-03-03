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
import { Game } from 'src/app/models/game';
import { FestivaljsonService } from 'src/app/services/festivaljson.service';
import { GameService } from 'src/app/services/game.service';
import { MessageService } from 'src/app/services/message.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.sass'],
})
export class GameDetailsComponent {
  @Input() public game?: Game;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly gameService: GameService
  ) {}

  formGroup!: FormGroup;

  ngOnChanges() {
    this.updateFormFromGame();
  }

  updateFormFromGame() {
    if (!this.game) {
      this.game = new Game(uuidv4(), 'Default Game', 'child');
    }

    this.formGroup = this.formBuilder.group({
      name: [this.game.name],
      ageMin: [this.game.ageMin],
      ageMax: [this.game.ageMax],
    });
  }

  validate() {
    if (!this.game) {
      this.game = new Game(uuidv4(), 'Default game', 'child');
    }

    this.game.name = this.formGroup.value.name;
    this.game.ageMin = this.formGroup.value.ageMin;
    this.game.ageMax = this.formGroup.value.ageMax;

    this.messageService.log(
      `${this.game!.name} - ${this.game!.ageMin} - ${this.game!.ageMax}`
    );
    this.gameService.addUpdateGame(this.game);

    this.game = undefined;
  }
}
