import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Festival } from '../models/festival';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class FestivaljsonService {
  private path = '/festivals/';
  private festivalStore: AngularFirestore;
  private festivalCollection: AngularFirestoreCollection<Festival>;

  constructor(
    private readonly firebaseStore: AngularFirestore,
    private readonly messageService: MessageService
  ) {
    this.festivalStore = firebaseStore;
    this.festivalCollection = firebaseStore.collection(this.path);
  }

  jsonToFestival(json: any) {
    return new Festival(
      json.name,
      json.id,
      json.tablemax_1,
      json.tableprice_1,
      json.tablebooked_1,
      json.sqmprice_1,
      json.sqmprice_1,
      json.tablemax_2,
      json.tableprice_2,
      json.tablebooked_2,
      json.sqmprice_2,
      json.sqmprice_2,
      json.tablemax_3,
      json.tableprice_3,
      json.tablebooked_3,
      json.sqmprice_3,
      json.sqmprice_3,
      json.editorIds,
      json.gameIds
    );
  }

  getFestivals(): Observable<Festival[]> {
    return this.festivalCollection.valueChanges({ idField: 'id' }).pipe(
      tap((doc) => {
        this.messageService.log(`doc=${JSON.stringify(doc)}`);
      }),
      map((data) => data.map((doc) => this.jsonToFestival(doc)))
    );
  }

  addUpdateFestival(festival: Festival) {
    if (festival.id == null) {
      festival.id = this.festivalStore.createId();
    }
    this.festivalCollection.doc(festival.id).set(Object.assign({}, festival));
  }

  addNewFestival(festival: Festival) {
    if (festival.id == null) {
      festival.id = this.festivalStore.createId();
    }
    this.festivalCollection
      .doc(festival.id)
      .get()
      .subscribe((doc) => {
        if (!doc.exists) {
          this.festivalCollection
            .doc(festival.id)
            .set(Object.assign({}, festival));
        } // else doc exists!
      });
  }

  deleteFestival(festival: Festival) {
    this.festivalStore.doc<Festival>(this.path + festival.id).delete();
  }

  getFestival(id: String): Observable<Festival> {
    var itemDoc = this.festivalStore.doc<Festival>(this.path + id);
    return itemDoc
      .valueChanges()
      .pipe(map((fest) => this.jsonToFestival(fest)));
  }
}
