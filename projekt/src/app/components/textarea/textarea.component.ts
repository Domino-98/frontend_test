import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class TextareaComponent {
  @Input() label: string = '';
  @Input() controlName: string = '';
  @Input() rows: number = 4;
  @Input() control!: FormControl;
  @Input() isRequired: boolean = false;

  constructor() { }

  get controlInvalid(): boolean | undefined {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get requiredError(): boolean {
    return this.control.errors?.['required'] ?? false;
  }
}
