import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() btnClass: string = '';
  @Input() btnType: 'button' | 'submit' = 'button';
  @Input() title?: string;
  @Output() onClick = new EventEmitter<string>();

  emitEvent() {
    this.onClick.emit();
  }

  get computedTitle(): string {
    return this.title ?? this.text;
  }
}
