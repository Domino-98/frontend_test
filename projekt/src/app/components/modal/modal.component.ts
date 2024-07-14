import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  animations: [
    trigger('openCloseFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms', style({ opacity: 0 }))
      ])
    ])
  ],
  imports: [NgIf],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() title: string = '';
  @Input() modalContent: string = '';
  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeModal() {
    this.closeModalEvent.emit(true);
  }
}
