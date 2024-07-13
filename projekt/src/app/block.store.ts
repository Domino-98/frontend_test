// app.store.ts
import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { OptionValue } from './models/option';
import { DataService } from './services/data.service';

export interface BlockState {
  radioValue: OptionValue | null;
  allTextBlocks: string[];
  selectedTextBlocks: string[];
  personalData: string;
}

const initialState: BlockState = {
  radioValue: null,
  allTextBlocks: [],
  selectedTextBlocks: [`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et vitae, exercitationem modi obcaecati
    nam dignissimos possimus, perferendis assumenda earum commodi dolorem perspiciatis tempore dicta natus tenetur
    eius architecto beatae magni fuga! Ad sit animi illum commodi mollitia quis dolorem iure? Quod tempora dignissimos
    neque consequatur eos voluptates repellat quidem voluptatibus placeat quaerat exercitationem quasi sequi labore
    vel asperiores distinctio magnam inventore unde animi vitae recusandae, assumenda architecto. Quam dignissimos,
    nulla culpa libero enim ullam. Reprehenderit aspernatur est omnis laboriosam ipsa!`],
  personalData: ''
};

@Injectable({
  providedIn: 'root'  // This makes the store available application-wide
})
export class BlockStore extends ComponentStore<BlockState> {
  constructor(private dataService: DataService) {
    super(initialState);
    this.loadTextBlocks();
  }

  readonly setRadioValue = this.updater<OptionValue>((state, radioValue: OptionValue) => ({
    ...state,
    radioValue: radioValue,
  }));

  readonly availableTextBlocks$ = this.select((state) => state.allTextBlocks.filter(block => !state.selectedTextBlocks.includes(block)));
  readonly sortedSelectedTextBlocks$ = this.select((state) => [...state.selectedTextBlocks].sort());
  readonly selectedTextBlocks$ = this.select((state) => state.selectedTextBlocks);

  readonly allTextBlocks$ = this.select((state) => state.allTextBlocks);
  readonly radioValue$ = this.select((state) => state.radioValue);
  readonly personalData$ = this.select((state) => state.personalData);

  readonly appendTextBlock = this.updater((state, block: string) => ({
    ...state,
    selectedTextBlocks: [...state.selectedTextBlocks, block]
  }));
  readonly setTextBlocks = this.updater((state, blocks: string[]) => ({
    ...state,
    selectedTextBlocks: [...blocks]
  }));
  readonly setAllTextBlocks = this.updater((state, blocks: string[]) => ({
    ...state,
    allTextBlocks: [...blocks]
  }))
  readonly setPersonalData = this.updater((state, personalData: string) => ({
    ...state,
    personalData
  }))
  readonly resetState = this.updater(() => {
    const newState = initialState;
    this.loadTextBlocks();
    return newState;
  });

  private loadTextBlocks() {
    this.dataService.getData().subscribe(data => {
      this.setAllTextBlocks(data);
    });
  }
}
