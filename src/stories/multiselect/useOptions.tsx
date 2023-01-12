import { useEffect, useState } from "react";
import { MultiSelectProps } from "./_types";

export const useOptions = ({
  options,
  selectedItems,
  onChange,
}: {
  options: MultiSelectProps["options"];
  selectedItems: MultiSelectProps["selectedItems"];
  onChange: MultiSelectProps["onChange"];
}) => {
  const [currentOptions, setCurrentOptions] = useState(options);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSelectedItems, setSelectedItems] = useState(
    selectedItems || []
  );
  const [inputValue, setInputValue] = useState("");
  const [matchingOptions, setMatchingOptions] = useState(options);

  const selectItems = async (selection: typeof options, newLabel?: string) => {
    setIsLoading(true);
    const unselectedItems = currentOptions.filter(
      (option) =>
        !selection.find((selectedItem) => selectedItem.id === option.id)
    );
    let newSelectedItems = selection;
    if (onChange) {
      newSelectedItems = await onChange(selection, newLabel);
    }
    setCurrentOptions([...unselectedItems, ...newSelectedItems]);
    setSelectedItems(newSelectedItems);
    setInputValue("");
    setIsLoading(false);
  };

  useEffect(() => {
    const matchedOptions = currentOptions.filter((option) => {
      return (
        option.label
          .trim()
          .toLowerCase()
          .indexOf(inputValue.trim().toLowerCase()) !== -1
      );
    });

    setMatchingOptions(matchedOptions);
  }, [inputValue]);

  return {
    currentOptions,
    currentSelectedItems,
    matchingOptions,
    inputValue,
    setInputValue,
    selectItems,
    isLoading,
  };
};
