import {
  IComboboxProps,
  Combobox as ZendeskCombobox,
} from "@zendeskgarden/react-dropdowns.next";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ComboboxProps extends IComboboxProps {
  isEditable?: boolean;
}

// A simple wrapper around the Zendesk Combobox to expose the isEditable prop
export const Combobox = ({ isEditable, ...props }: ComboboxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEditable || !isExpanded || !ref.current) return;

    // Close on outside click
    const handleDocumentClick = (e: MouseEvent) => {
      const listboxElements = document.querySelectorAll(
        '[data-garden-container-id="containers.combobox.listbox"]'
      );
      const isClickInsideListbox = Array.from(listboxElements).some((el) =>
        el.contains(e.target as Node)
      );
      const isClickInsideRef = ref.current?.contains(e.target as Node);
      if (
        !isClickInsideListbox &&
        !isClickInsideRef &&
        e.target instanceof Element &&
        e.target.closest('[data-qa="tooltip-modal-option"') === null
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded, isEditable, ref.current]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }
      if (isEditable && !isExpanded) {
        if (
          e.target === ref.current ||
          ref.current?.contains(e.target as Node)
        ) {
          setIsExpanded(true);
        }
      }
    },
    [isExpanded, props.onClick, isEditable]
  );

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    (event) => {
      props.onChange?.(event);
      if (
        (event.type === "option:click" ||
          event.type === "input:keyDown:Enter") &&
        event.selectionValue
      ) {
        if (isEditable && !props.isMultiselectable) {
          setIsExpanded(false);
        }
      }
    },
    [isEditable, props.isMultiselectable, props.onChange]
  );

  return (
    <ZendeskCombobox
      {...props}
      ref={ref}
      isExpanded={isEditable ? isExpanded : props.isExpanded}
      onClick={handleClick}
      onChange={handleChange}
    />
  );
};
