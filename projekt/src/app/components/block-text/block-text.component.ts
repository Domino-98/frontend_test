import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BlockStore } from '@app/block.store';

@Component({
  selector: 'app-block-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-text.component.html',
  styleUrl: './block-text.component.scss'
})
export class BlockTextComponent {
  blockStore = inject(BlockStore);
}
