import { convertToMatrix } from "@zendeskgarden/container-utilities";
import { ColorSwatchDialog } from "@zendeskgarden/react-colorpickers";
import React, { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as ColorIndicatorIcon } from "../../assets/icons/circle-full-fill.svg";
import { ColorSwatchProps, ColorSwatchTriggerProps } from "./_types";

const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

const StyledColorSwatchDialog = styled(ColorSwatchDialog)<{
  disableTooltip?: boolean;
}>`
  ${({ disableTooltip }) =>
    disableTooltip &&
    `
  & div[role="tooltip"] {
    display: none;
  }`}
`;

const ColorSwatchTrigger = React.forwardRef(
  (
    props: ColorSwatchTriggerProps & React.ComponentPropsWithoutRef<"div">,
    ref: React.Ref<HTMLDivElement>
  ) => (
    <Trigger
      ref={ref}
      {...props}
      style={{
        ...props.style,
        color: props.color,
      }}
    >
      {props.children ?? <ColorIndicatorIcon />}
    </Trigger>
  )
);

const ColorSwatch = ({
  colors,
  rowSize,
  children,
  onSelect,
  ...props
}: ColorSwatchProps) => {
  /**
   * Convert the colors to the format expected by the ColorSwatchDialog
   */
  const cleanedColors = colors.map(({ label, value }) => {
    return {
      value,
      label: label ?? "",
    };
  });

  const matrix = convertToMatrix(cleanedColors, rowSize ?? 7);
  const [color, setColor] = useState(matrix[0][0].value);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [selectedColIndex, setSelectedColIndex] = useState(0);

  const handleSelect = (rowIdx: number, colIdx: number) => {
    setSelectedRowIndex(rowIdx);
    setSelectedColIndex(colIdx);
  };

  return (
    <StyledColorSwatchDialog
      colors={matrix}
      onSelect={(rowIdx, colIdx) => {
        if (rowIdx === null || colIdx === null) return;
        handleSelect(rowIdx, colIdx);
        const newColor = matrix[rowIdx][colIdx].value;
        setColor(newColor);
        if (onSelect) onSelect(newColor);
      }}
      selectedRowIndex={selectedRowIndex}
      selectedColIndex={selectedColIndex}
      {...props}
    >
      <ColorSwatchTrigger color={color}>{children}</ColorSwatchTrigger>
    </StyledColorSwatchDialog>
  );
};

export { ColorSwatch };
