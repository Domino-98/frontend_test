import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { OptionValue } from '@app/models/option';
import { ContentService } from '@app/services/content.service';
import { Content } from '@app/models/content';

export interface BlockState {
  radioValue: OptionValue | null;
  allContents: Content[];
  selectedContents: Content[];
  personalData: string;
}

const initialState: BlockState = {
  radioValue: null,
  allContents: [],
  selectedContents: [],
  personalData: ''
};

@Injectable({
  providedIn: 'root'
})
export class BlockStore extends ComponentStore<BlockState> {
  private readonly STORAGE_KEY = 'contents';

  constructor(private contentService: ContentService) {
    super(initialState);
    this.loadContents();
  }

  private loadContents() {
    this.contentService.getData().subscribe(data => {
      if (!data.length) return;
      this.setAllContents(data);
      this.setSelectedContents([data[0]]);
    });
  }

  readonly setRadioValue = this.updater<OptionValue>((state, radioValue: OptionValue) => ({
    ...state,
    radioValue: radioValue,
  }));

  readonly allContents$ = this.select((state) => state.allContents);
  readonly selectedContents$ = this.select((state) => state.selectedContents);
  readonly availableContents$ = this.select((state) => state.allContents.filter(block => !state.selectedContents.some(selected => selected.id === block.id)));
  readonly sortedSelectedContents$ = this.select((state) => [...state.selectedContents].sort((a, b) => a.content.localeCompare(b.content)));
  readonly radioValue$ = this.select((state) => state.radioValue);
  readonly personalData$ = this.select((state) => state.personalData);

  readonly appendContent = this.updater((state, content: Content) => {
    const isContentExist = state.selectedContents.some(c => c.id === content.id);
    if (!isContentExist) {
      return {
        ...state,
        selectedContents: [...state.selectedContents, content]
      };
    }
    return state;
  });
  readonly setSelectedContents = this.updater((state, contents: Content[]) => ({
    ...state,
    selectedContents: [...contents]
  }));
  readonly setAllContents = this.updater((state, contents: Content[]) => {
    const newState = { ...state, allContents: [...contents] };
    this.saveToLocalStorage(newState.allContents);
    return newState;
  });
  readonly setPersonalData = this.updater((state, personalData: string) => ({
    ...state,
    personalData
  }))
  readonly resetState = this.updater(() => {
    const newState = initialState;
    this.loadContents();
    return newState;
  });

  // Local storage
  private saveToLocalStorage(allContents: Content[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allContents));
  }
  private clearLocalStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Manage content methods
  readonly addContent = this.updater((state, content: Content) => {
    const newAllContents = [...state.allContents, content];
    this.saveToLocalStorage(newAllContents);
    return {
      ...state,
      allContents: newAllContents
    };
  });
  readonly editContent = this.updater((state, { id, content }: Content) => {
    const newAllContents = state.allContents.map(oldContent => oldContent.id === id ? { ...oldContent, content } : oldContent);
    const newSelectedContents = state.selectedContents.map(oldContent => oldContent.id === id ? { ...oldContent, content } : oldContent);
    this.saveToLocalStorage(newAllContents);
    return {
      ...state,
      allContents: newAllContents,
      selectedContents: newSelectedContents
    };
  });
  readonly removeContent = this.updater((state, contentId: string) => {
    const newAllContents = state.allContents.filter(content => content.id !== contentId);
    const newSelectedContents = state.selectedContents.filter(content => content.id !== contentId);
    this.saveToLocalStorage(newAllContents);
    return {
      ...state,
      allContents: newAllContents,
      selectedContents: newSelectedContents
    };
  });
  readonly removeAllContents = this.updater((state) => {
    this.clearLocalStorage();
    return {
      ...state,
      allContents: [],
      selectedContents: []
    };
  });
}
