import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { BlockStore } from '@app/store/block.store';
import { OptionValue } from '@app/models/option';
import { ModalComponent } from '../modal/modal.component';
import { combineLatest } from 'rxjs';
import { Content } from '@app/models/content';
import { BlockAction } from '@app/models/action';

@Component({
  selector: 'app-block-two',
  standalone: true,
  imports: [ButtonComponent, ModalComponent],
  templateUrl: './block-two.component.html',
  styleUrl: './block-two.component.scss',
})
export class BlockTwoComponent {
  @Output() selectedAction = new EventEmitter<BlockAction>();

  modalOpen = false;
  modalContent: string = '';

  blockStore = inject(BlockStore);

  radioValue: OptionValue | null = null;
  allContents: Content[] = [];
  selectedContents: Content[] = [];
  availableContents: Content[] = [];
  sortedSelectedContents: Content[] = [];

  constructor() {
    combineLatest([
      this.blockStore.radioValue$,
      this.blockStore.allContents$,
      this.blockStore.selectedContents$,
      this.blockStore.availableContents$,
      this.blockStore.sortedSelectedContents$
    ]).subscribe(([radioValue, allContents, selectedContents, availableContents, sortedSelectedContents]) => {
      this.radioValue = radioValue;
      this.allContents = allContents;
      this.selectedContents = selectedContents;
      this.availableContents = availableContents;
      this.sortedSelectedContents = sortedSelectedContents;
    });
  }

  openModal(content: string) {
    this.modalContent = content;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleContentAction(action: BlockAction) {
    if (!this.radioValue) {
      this.openModal('Najpierw wybierz opcję.');
      return;
    }

    let content = this.getContent(action);

    if (content === 'not-found') {
      this.openModal('Brak wartości do doklejenia.');
      return;
    } else if (content === 'exists') {
      this.openModal('Wartość już została doklejona do bloku.');
      return;
    }

    if (action === 'replace')
      this.blockStore.setSelectedContents([content as Content]);
    else if (action === 'append')
      this.blockStore.appendContent(content as Content);
  }

  getContent(action: BlockAction): Content | string | undefined {
    if (!this.allContents.length)
      return 'not-found';

    let content: Content | undefined;

    switch (this.radioValue) {
      case OptionValue.First:
        content = this.allContents[0];
        break;
      case OptionValue.Second:
        content = this.allContents[1];
        break;
      case OptionValue.Random:
        content = this.getRandomValue(this.availableContents) ?? this.getRandomValue(this.allContents)
        break;
    }

    if (content) {
      const blockExists = this.selectedContents.some(block => block.id === content?.id);

      return (blockExists && action === 'append')
        ? 'exists'
        : content;
    }

    return content;
  }

  getRandomValue(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
