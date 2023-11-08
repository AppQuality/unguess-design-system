import { convertToMatrix } from "@zendeskgarden/container-utilities";
import { ColorSwatchDialog } from "@zendeskgarden/react-colorpickers";
import React, { useState } from "react";
import { ColorSwatchTriggerProps, ColorSwatchProps, } from "./_types";
import { ReactComponent as ColorIndicatorIcon } from "../../assets/icons/circle-full-fill.svg";
import { styled } from "styled-components";

const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

const ColorSwatchTrigger = React.forwardRef(
  (
    props: ColorSwatchTriggerProps & React.ComponentPropsWithoutRef<'div'>,
    ref: React.Ref<HTMLDivElement>
  ) => (
    <Trigger ref={ref} {...props} style={{
      ...props.style,
      color: props.color,
    }}>
      {props.children ?? <ColorIndicatorIcon />}
    </Trigger>
  )
);

const ColorSwatch = ({
  colors,
  rowSize,
  children,
  onSelect,
}: ColorSwatchProps) => {
  const matrix = convertToMatrix(colors, rowSize ?? 7);
  const [color, setColor] = useState(
    matrix[0][0].value
  );
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [selectedColIndex, setSelectedColIndex] = useState(0);

  const handleChange = (rowIdx: number, colIdx: number) => {
    setRowIndex(rowIdx);
    setColIndex(colIdx);
  };

  const handleSelect = (rowIdx: number, colIdx: number) => {
    setSelectedRowIndex(rowIdx);
    setSelectedColIndex(colIdx);
    setColor(matrix[rowIdx][colIdx].value);
  };

  return (
    <ColorSwatchDialog
      colors={matrix}
      onChange={handleChange}
      onSelect={(rowIdx, colIdx) => {
        handleSelect(rowIdx, colIdx);
        if (onSelect) onSelect(color);
      }}
      rowIndex={rowIndex}
      colIndex={colIndex}
      selectedRowIndex={selectedRowIndex}
      selectedColIndex={selectedColIndex}
    >
      <ColorSwatchTrigger color={color}>
        {children}
      </ColorSwatchTrigger>
    </ColorSwatchDialog>
  );
};

export { ColorSwatch };
