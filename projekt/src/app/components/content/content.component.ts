import { CommonModule } from '@angular/common';
import { Component, inject, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockStore } from '@app/store/block.store';
import { ButtonComponent } from '../button/button.component';
import { ModalComponent } from '../modal/modal.component';
import { v4 as uuidv4 } from 'uuid';
import { TextareaComponent } from '../textarea/textarea.component';
import { ManageAction } from '@app/models/action';
import { Content } from '@app/models/content';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent, ReactiveFormsModule, TextareaComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [FormBuilder]
})
export class ContentComponent implements AfterContentInit {
  blockStore = inject(BlockStore);

  modalOpen: boolean = false;
  modalTitle: string = '';
  modalContent: string = '';
  activeContent: Content | undefined;

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngAfterContentInit() {
    this.form = this.fb.group({
      content: ['', Validators.required]
    });
  }

  handleContentAction(action: ManageAction, id?: string) {
    if (action === 'add') {
      if (this.form.valid) {
        const contentValue = this.form.get('content')!.value;
        const id = uuidv4();
        const contentObject = { id, content: contentValue };
        this.blockStore.addContent(contentObject);
        this.closeModal();
      } else {
        this.form.markAllAsTouched();
      }
    } else if (action === 'edit') {
      if (this.form.valid) {
        const newContent = this.form.get('content')!.value;
        this.blockStore.editContent({ id, content: newContent } as Content);
        this.closeModal();
      } else {
        this.form.markAllAsTouched();
      }
    } else if (action === 'delete') {
      this.blockStore.removeContent(id as string);
    } else if (action === 'deleteAll') {
      this.blockStore.removeAllContents();
    }
  }

  closeModal() {
    this.modalOpen = false;
  }

  openModal(title: string, content?: Content) {
    this.form.reset();
    if (content) {
      this.activeContent = content;
      this.form.setValue({
        content: content.content
      });
    } else {
      this.activeContent = undefined;
      this.form.setValue({
        content: ''
      });
    }
    this.modalTitle = title;
    this.modalOpen = true;
  }
}
