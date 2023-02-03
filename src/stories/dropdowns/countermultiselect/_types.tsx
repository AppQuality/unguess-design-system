import { ItemArgs } from "../item/_types";

export interface CounterMultiselectArgs {
  options: (Omit<ItemArgs, "value"> & {
    itemId: number | string;
    label: string;
    selected?: boolean;
  })[];
  isCompact?: boolean;
  label?: React.ReactNode;
  onChange?: (selectedItems: CounterMultiselectArgs["options"]) => void;
  i18n?: {
    counterText?: (count: number) => string;
    noItems?: string;
    noMatches?: string;
  };
}
