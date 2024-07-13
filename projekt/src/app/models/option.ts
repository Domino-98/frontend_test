export interface Option {
  label: string;
  value: OptionValue;
}

export enum OptionValue {
  First = 'first',
  Second = 'second',
  Random = 'random'
}
