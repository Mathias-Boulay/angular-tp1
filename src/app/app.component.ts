import { Component } from '@angular/core';
import { Editor } from './models/editor';
import { Festival } from './models/festival';
import { Game } from './models/game';
import { EditorService } from './services/editor.service';
import { FestivaljsonService } from './services/festivaljson.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(
    private jsonService: FestivaljsonService,
    private editorService: EditorService,
    private gameService: GameService
  ) {}

  title = 'FestivalApp';
  festivals = this.jsonService.getFestivals();
  editors = this.editorService.getEditors();
  games = this.gameService.getGames();

  edittedFestival?: Festival;
  edittedEditor?: Editor;
  edittedGame?: Game;

  editFestival(festival: Festival) {
    this.edittedFestival = festival;
  }

  editEditor(editor: Editor) {
    this.edittedEditor = editor;
  }

  editGame(game: Game) {
    this.edittedGame = game;
  }
}
