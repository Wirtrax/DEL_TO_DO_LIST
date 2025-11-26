export type DropdownValue = 'isCompleted' | 'isImport' | '';

export interface Option {
  value: DropdownValue;
  label: string;
}

export interface DropdownProps {
  value?: DropdownValue;
  onChange?: (value: DropdownValue) => void;
  options?: Option[];
  placeholder?: string;
}
