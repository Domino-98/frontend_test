import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BlockStore } from '@app/store/block.store';

@Component({
  selector: 'app-block-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-content.component.html',
  styleUrl: './block-content.component.scss'
})
export class BlockContentComponent {
  blockStore = inject(BlockStore);
}
