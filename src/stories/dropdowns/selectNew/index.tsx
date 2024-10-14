import {
  Combobox,
  Field,
  Label,
  OptGroup,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import { ComponentProps } from "react";
import styled from "styled-components";
import { SelectArgs } from "./_types";

const StyledComboBox = styled(Combobox)<{ isPrimary?: boolean }>`
  [data-garden-container-id="containers.combobox.option"] {
    display: flex;
    gap: ${({ theme }) => theme.space.sm};
    align-items: center;
  }

  ${(props) =>
    props.isPrimary &&
    `
    [data-garden-container-id="containers.combobox"] {
      background-color: ${props.theme.palette.blue[600]};
     color: white;
     svg[data-garden-id="dropdowns.combobox.input_icon"] {
        color: white;
     }
    }
 `}
`;

const SelectNew = ({
  label,
  className,
  children,
  onSelect,
  ...props
}: SelectArgs) => {
  return (
    <div className={className}>
      <Field>
        {label ? <Label>{label}</Label> : null}
        <StyledComboBox
          {...props}
          isEditable={false}
          onChange={(changeEvent) => {
            if (
              ["input:keyDown:Enter", "option:click"].includes(
                changeEvent.type
              ) &&
              changeEvent.selectionValue &&
              onSelect
            ) {
              onSelect(changeEvent.selectionValue.toString());
            }
          }}
        >
          {children}
        </StyledComboBox>
      </Field>
    </div>
  );
};

SelectNew.Option = Option;

const StyledMenuOption = styled(Option)`
  padding-left: ${({ theme }) => theme.space.sm};
  padding-right: ${({ theme }) => theme.space.sm};
  &[aria-disabled="true"] {
    color: ${({ theme }) => theme.palette.blue[600]};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    cursor: pointer;
    &:hover {
      border-radius: 0 !important;
      box-shadow: inset 3px 0 ${({ theme }) => theme.palette.blue[600]};
      background-color: ${({ theme }) => theme.palette.blue[600]}14;
    }
  }
`;

SelectNew.MenuOption = (
  props: Omit<ComponentProps<typeof SelectNew.Option>, "isDisabled">
) => {
  return <StyledMenuOption {...props} isDisabled />;
};

const OptionGroup = styled(OptGroup)`
  [data-garden-id="dropdowns.combobox.option.content"]
    > [data-garden-id="dropdowns.combobox.option"] {
    padding-left: ${({ theme }) => theme.space.sm};
    padding-right: ${({ theme }) => theme.space.sm};
  }
`;

SelectNew.OptionGroup = OptionGroup;

const OptionTitle = styled.div`
  padding: ${({ theme }) => theme.space.xxs} ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

SelectNew.OptionTitle = OptionTitle;

export { SelectNew };
