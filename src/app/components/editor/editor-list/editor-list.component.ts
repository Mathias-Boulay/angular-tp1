import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Editor } from 'src/app/models/editor';
import { EditorService } from 'src/app/services/editor.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.sass'],
})
export class EditorListComponent {
  constructor(
    public messageService: MessageService,
    private readonly editorService: EditorService
  ) {}

  @Input() editors!: Editor[] | null;
  @Output() editorSelected = new EventEmitter<Editor>();

  ngOnInit(): void {
    this.messageService.log('Message list initialized');
    if (!this.editors) {
      this.editorService.getEditors().subscribe((editors) => {
        this.editors = editors;
      });
    }
  }

  deleteEditor(index: number) {
    this.editorService.deleteEditor(this.editors![index]);
  }
  selectEditor(index: number) {
    this.editorSelected.emit(this.editors![index]);
  }
}
