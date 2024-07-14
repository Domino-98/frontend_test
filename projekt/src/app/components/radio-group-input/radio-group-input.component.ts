import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { BlockStore } from '@app/store/block.store';

@Component({
  selector: 'app-radio-group-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './radio-group-input.component.html',
  styleUrls: ['./radio-group-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupInputComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupInputComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) options: any[] = [];
  @Output() valueChange = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    value: new FormControl<string | null>(null),
  });

  private blockStore = inject(BlockStore);

  ngOnInit(): void {
    this.blockStore.radioValue$.subscribe((value) => {
      this.form.patchValue({ value }, { emitEvent: false });
    });

    this.form.valueChanges.subscribe((value) => {
      if (value.value !== null) {
        this.blockStore.setRadioValue(value.value);
      }
    });
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: string): void {
    this.form.patchValue({ value }, { emitEvent: false });
  }

  onChange: (value: unknown) => void = () => { };
  onTouch: () => void = () => { };

  handleLabelKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter') {
      const value = this.options[index].value;
      this.form.patchValue({ value });
      event.preventDefault();
    }
  }
}
