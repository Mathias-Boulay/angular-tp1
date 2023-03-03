import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MessageService } from './message.service';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private path = '/games/';
  private gameStore: AngularFirestore;
  private gameCollection: AngularFirestoreCollection<Game>;

  constructor(
    private readonly firebaseStore: AngularFirestore,
    private readonly messageService: MessageService
  ) {
    this.gameStore = firebaseStore;
    this.gameCollection = firebaseStore.collection(this.path);
  }

  jsonToGame(json: any): Game {
    return new Game(
      json.id,
      json.editorId,
      json.name,
      json.type,
      json.ageMin,
      json.ageMax,
      json.nbMin,
      json.nbMax
    );
  }

  getGames(): Observable<Game[]> {
    return this.gameCollection.valueChanges({ idField: 'id' }).pipe(
      tap((doc) => {
        this.messageService.log(`doc=${JSON.stringify(doc)}`);
      }),
      map((data) => data.map((doc) => this.jsonToGame(doc)))
    );
  }

  addUpdateGame(game: Game) {
    if (game.id == null) {
      game.id = this.gameStore.createId();
    }
    this.gameCollection.doc(game.id).set(Object.assign({}, game));
  }

  addNewGame(game: Game) {
    if (game.id == null) {
      game.id = this.gameStore.createId();
    }
    this.gameCollection
      .doc(game.id)
      .get()
      .subscribe((doc) => {
        if (!doc.exists) {
          this.gameCollection.doc(game.id).set(Object.assign({}, game));
        } // else doc exists!
      });
  }

  deleteGame(game: Game) {
    this.gameStore.doc<Game>(this.path + game.id).delete();
  }

  getGame(id: String): Observable<Game> {
    var itemDoc = this.gameStore.doc<Game>(this.path + id);
    return itemDoc.valueChanges().pipe(map((fest) => this.jsonToGame(fest)));
  }
}
