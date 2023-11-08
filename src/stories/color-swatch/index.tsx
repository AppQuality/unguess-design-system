import { convertToMatrix } from "@zendeskgarden/container-utilities";
import { IconButton } from "@zendeskgarden/react-buttons";
import { ColorSwatchDialog } from "@zendeskgarden/react-colorpickers";
import { Col, Row } from "@zendeskgarden/react-grid";
import { ReactComponent as ColorIndicatorIcon } from "../../assets/icons/circle-full-fill.svg";
import React, { useState } from "react";
import { ColorSwatchIconButtonProps, ColorSwatchProps, } from "./_types";



const ColorSwatchIconButton = React.forwardRef(
  (
    props: ColorSwatchIconButtonProps & React.ComponentPropsWithoutRef<"button">,
    ref: React.Ref<HTMLButtonElement>
  ) => (
      <IconButton
        aria-label="palette"
        ref={ref}
        style={{ color: props.iconColor }}
        {...props}
      >
       <ColorIndicatorIcon />
      </IconButton>
  )
);

const ColorSwatch = ({
  colors,
  initialRowIndex,
  initialColIndex,
}: ColorSwatchProps) => {
  const matrix = convertToMatrix(colors, 7);
  const [color, setColor] = useState(
    matrix[initialRowIndex][initialColIndex].value
  );
  const [rowIndex, setRowIndex] = useState(initialRowIndex);
  const [colIndex, setColIndex] = useState(initialColIndex);
  const [selectedRowIndex, setSelectedRowIndex] = useState(initialRowIndex);
  const [selectedColIndex, setSelectedColIndex] = useState(initialColIndex);

  const onChange = (rowIdx: number, colIdx: number) => {
    setRowIndex(rowIdx);
    setColIndex(colIdx);
  };

  const onSelect = (rowIdx: number, colIdx: number) => {
    setSelectedRowIndex(rowIdx);
    setSelectedColIndex(colIdx);
    setColor(matrix[rowIdx][colIdx].value);
  };

  return (
    <Row>
      <Col textAlign="center">
        <ColorSwatchDialog
          colors={matrix}
          onChange={onChange}
          onSelect={onSelect}
          rowIndex={rowIndex}
          colIndex={colIndex}
          selectedRowIndex={selectedRowIndex}
          selectedColIndex={selectedColIndex}
        >
          <ColorSwatchIconButton iconColor={color} />
        </ColorSwatchDialog>
      </Col>
    </Row>
  );
};

export default ColorSwatch;
