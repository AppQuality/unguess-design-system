import styled from "styled-components";
import { useState, KeyboardEvent } from "react";

interface NumberInputProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f3f3;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Input = styled.input`
  width: 60px;
  text-align: right;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 8px;
  background: #fff;
`;

export const NumberInput = ({
  value = 0,
  min = 0,
  max = 100,
  step = 5,
  disabled = false,
  onChange,
}: NumberInputProps) => {
  const [internalValue, setInternalValue] = useState<number>(value);

  const clamp = (val: number) => Math.max(min, Math.min(max, val));

  const handleChange = (val: number) => {
    setInternalValue(val);
    onChange?.(val);
  };

  const handleDecrement = () => {
    handleChange(clamp(internalValue - step));
  };

  const handleIncrement = () => {
    handleChange(clamp(internalValue + step));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace(/\D/g, ""), 10);
    if (!isNaN(val)) {
      handleChange(clamp(val));
    } else {
      setInternalValue(0);
      onChange?.(0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <Wrapper>
      <Button onClick={handleDecrement} disabled={disabled || internalValue <= min} aria-label="Decrement">
        -
      </Button>
      <Input
        type="text"
        value={`${internalValue}%`}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-valuenow={internalValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label="Percentuale"
        tabIndex={0}
      />
      <Button onClick={handleIncrement} disabled={disabled || internalValue >= max} aria-label="Increment">
        +
      </Button>
    </Wrapper>
  );
};
