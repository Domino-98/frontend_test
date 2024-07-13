import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { Action } from '@app/models/action';
import { BlockStore } from '@app/block.store';
import { OptionValue } from '@app/models/option';
import { ModalComponent } from '../modal/modal.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-block-two',
  standalone: true,
  imports: [ButtonComponent, ModalComponent],
  templateUrl: './block-two.component.html',
  styleUrl: './block-two.component.scss',
})
export class BlockTwoComponent {
  @Output() selectedAction = new EventEmitter<Action>();

  modalOpen = false;
  modalContent: string = '';

  blockStore = inject(BlockStore);

  radioValue: OptionValue | null = null;
  allTextBlocks: string[] = [];
  selectedTextBlocks: string[] = [];
  availableTextBlocks: string[] = [];
  sortedSelectedTextBlocks: string[] = [];

  constructor() {
    combineLatest([
      this.blockStore.radioValue$,
      this.blockStore.allTextBlocks$,
      this.blockStore.selectedTextBlocks$,
      this.blockStore.availableTextBlocks$,
      this.blockStore.sortedSelectedTextBlocks$
    ]).subscribe(([radioValue, allTextBlocks, selectedTextBlocks, availableTextBlocks, sortedSelectedTextBlocks]) => {
      this.radioValue = radioValue;
      this.allTextBlocks = allTextBlocks;
      this.selectedTextBlocks = selectedTextBlocks;
      this.availableTextBlocks = availableTextBlocks;
      this.sortedSelectedTextBlocks = sortedSelectedTextBlocks;
    });
  }

  openModal(content: string) {
    this.modalContent = content;
    this.modalOpen = true;
  }

  closeModal(event: boolean) {
    this.modalOpen = false;
  }

  handleBlockAction(action: Action) {
    if (!this.radioValue) {
      this.openModal('Najpierw wybierz opcję.');
      return;
    }

    let textBlock = this.getTextBlock(action);

    if (!textBlock) {
      this.openModal('Wartość już została doklejona do bloku.');
      return;
    }

    if (action === 'replace')
      this.blockStore.setTextBlocks([textBlock]);
    else if (action === 'append')
      this.blockStore.appendTextBlock(textBlock);
  }

  getTextBlock(action: Action): string {
    let textBlock = '';

    switch (this.radioValue) {
      case OptionValue.First:
        textBlock = this.allTextBlocks[0];
        break;
      case OptionValue.Second:
        textBlock = this.allTextBlocks[1];
        break;
      case OptionValue.Random:
        textBlock = this.allTextBlocks[Math.floor(Math.random() * this.allTextBlocks.length)];
        break;
    }

    const blockExists = this.selectedTextBlocks.some(block => block === textBlock);

    textBlock = blockExists && action === 'append'
      ? (this.radioValue === OptionValue.Random ? this.availableTextBlocks[Math.floor(Math.random() * this.availableTextBlocks.length)] : '')
      : textBlock;

    return textBlock;
  }
}
