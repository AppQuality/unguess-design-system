export interface CounterMultiselectArgs {
  options: {
    id: number;
    label: string;
    selected?: boolean;
  }[];
  label?: React.ReactNode;
  onChange?: (selectedItems: CounterMultiselectArgs["options"]) => void;
  i18n?: {
    counterText?: (count: number) => string;
    noItems?: string;
    noMatches?: string;
  };
}
