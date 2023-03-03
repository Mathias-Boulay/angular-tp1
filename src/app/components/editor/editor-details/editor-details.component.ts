import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Editor } from 'src/app/models/editor';
import { EditorService } from 'src/app/services/editor.service';
import { MessageService } from 'src/app/services/message.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-editor-details',
  templateUrl: './editor-details.component.html',
  styleUrls: ['./editor-details.component.sass'],
})
export class EditorDetailsComponent implements OnChanges {
  @Input() public editor?: Editor;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly editorService: EditorService
  ) {}

  formGroup!: FormGroup;

  ngOnChanges() {
    this.updateFormFromEditor();
  }

  updateFormFromEditor() {
    if (!this.editor) {
      this.editor = new Editor(uuidv4(), 'Default creator', 'XX XX XX XX XX');
    }

    this.formGroup = this.formBuilder.group({
      name: [this.editor.name],
      phone: [this.editor.phone],
    });
  }

  validate() {
    if (!this.editor) {
      this.editor = new Editor(uuidv4(), 'Default creator', 'XX XX XX XX XX');
    }

    this.editor.name = this.formGroup.value.name;
    this.editor.phone = this.formGroup.value.phone;

    this.messageService.log(`${this.editor!.name} - ${this.editor!.phone}`);
    this.editorService.addUpdateEditor(this.editor);

    this.editor = undefined;
  }
}
