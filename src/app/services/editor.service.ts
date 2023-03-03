import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MessageService } from './message.service';
import { Editor } from '../models/editor';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private path = '/editors/';
  private editorStore: AngularFirestore;
  private editorCollection: AngularFirestoreCollection<Editor>;

  constructor(
    private readonly firebaseStore: AngularFirestore,
    private readonly messageService: MessageService
  ) {
    this.editorStore = firebaseStore;
    this.editorCollection = firebaseStore.collection(this.path);
  }

  jsonToEditor(json: any): Editor {
    return new Editor(json.id, json.name, json.phone);
  }

  getEditors(): Observable<Editor[]> {
    return this.editorCollection.valueChanges({ idField: 'id' }).pipe(
      tap((doc) => {
        this.messageService.log(`doc=${JSON.stringify(doc)}`);
      }),
      map((data) => data.map((doc) => this.jsonToEditor(doc)))
    );
  }

  addUpdateEditor(editor: Editor) {
    if (editor.id == null) {
      editor.id = this.editorStore.createId();
    }
    this.editorCollection.doc(editor.id).set(Object.assign({}, editor));
  }

  addNewEditor(editor: Editor) {
    if (editor.id == null) {
      editor.id = this.editorStore.createId();
    }
    this.editorCollection
      .doc(editor.id)
      .get()
      .subscribe((doc) => {
        if (!doc.exists) {
          this.editorCollection.doc(editor.id).set(Object.assign({}, editor));
        } // else doc exists!
      });
  }

  deleteEditor(festival: Editor) {
    this.editorStore.doc<Editor>(this.path + festival.id).delete();
  }

  getEditor(id: String): Observable<Editor> {
    var itemDoc = this.editorStore.doc<Editor>(this.path + id);
    return itemDoc.valueChanges().pipe(map((fest) => this.jsonToEditor(fest)));
  }
}
