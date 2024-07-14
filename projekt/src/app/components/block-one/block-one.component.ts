import { Component } from '@angular/core';
import { Option, OptionValue } from '@app/models/option';
import { RadioGroupInputComponent } from '@components/radio-group-input/radio-group-input.component';

@Component({
  selector: 'app-block-one',
  standalone: true,
  imports: [RadioGroupInputComponent],
  templateUrl: './block-one.component.html',
  styleUrls: ['./block-one.component.scss'],
})
export class BlockOneComponent {
  options: Option[] = [
    {
      label: 'Opcja pierwsza',
      value: OptionValue.First
    },
    {
      label: 'Opcja druga',
      value: OptionValue.Second
    },
    {
      label: 'Opcja losowa',
      value: OptionValue.Random
    },
  ]
}
