import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.sass'],
})
export class GameListComponent {
  constructor(
    public messageService: MessageService,
    public readonly gameService: GameService
  ) {}

  @Input() games!: Game[] | null;
  @Output() gameSelected = new EventEmitter<Game>();

  ngOnInit(): void {
    this.messageService.log('Message list initialized');
    if (!this.games) {
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
      });
    }
  }

  deleteGame(index: number) {
    this.gameService.deleteGame(this.games![index]);
  }

  selectGame(index: number) {
    this.gameSelected.emit(this.games![index]);
  }
}
