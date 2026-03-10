import styled, { css } from "styled-components";
import {
  useRef,
  useState,
  useCallback,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";
import { CodeVerifierArgs } from "./_types";

const Wrapper = styled.div`
  display: inline-flex;
  gap: 8px;
`;

const validationColors = {
  success: css`
    border-color: ${({ theme }) => theme.palette.green[600]};
  `,
  warning: css`
    border-color: ${({ theme }) => theme.palette.yellow[600]};
  `,
  error: css`
    border-color: ${({ theme }) => theme.palette.red[600]};
  `,
};

const Box = styled.input<{
  $validation?: "success" | "warning" | "error";
}>`
  width: 48px;
  height: 56px;
  text-align: center;
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-family: ${({ theme }) => theme.fonts.system};
  border: 2px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  outline: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: ${({ theme }) => theme.palette.grey[800]};
  background: ${({ theme }) => theme.palette.white};
  caret-color: ${({ theme }) => theme.palette.blue[600]};

  &:focus {
    border-color: ${({ theme }) => theme.palette.blue[600]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.blue[100]};
  }

  &:disabled {
    background: ${({ theme }) => theme.palette.grey[100]};
    border-color: ${({ theme }) => theme.palette.grey[200]};
    color: ${({ theme }) => theme.palette.grey[400]};
    cursor: not-allowed;
  }

  ${({ $validation }) => $validation && validationColors[$validation]}
`;

const CodeVerifier = ({
  length,
  type = "numeric",
  validation,
  disabled = false,
  onComplete,
  onChange,
}: CodeVerifierArgs) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isValidChar = useCallback(
    (char: string) => {
      if (type === "numeric") return /^\d$/.test(char);
      return /^[a-zA-Z0-9]$/.test(char);
    },
    [type]
  );

  const updateValues = useCallback(
    (newValues: string[]) => {
      setValues(newValues);
      const code = newValues.join("");
      onChange?.(code);
      if (code.length === length && newValues.every((v) => v !== "")) {
        onComplete?.(code);
      }
    },
    [length, onChange, onComplete]
  );

  const handleChange = useCallback(
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const char = e.target.value.slice(-1);
      if (!char || !isValidChar(char)) return;

      const newValues = [...values];
      newValues[index] = char.toUpperCase();
      updateValues(newValues);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [values, isValidChar, updateValues, length]
  );

  const handleKeyDown = useCallback(
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newValues = [...values];
        if (values[index]) {
          newValues[index] = "";
          updateValues(newValues);
        } else if (index > 0) {
          newValues[index - 1] = "";
          updateValues(newValues);
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [values, updateValues, length]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text/plain").trim();
      const chars = pasted.split("").filter(isValidChar).slice(0, length);
      if (chars.length === 0) return;

      const newValues = [...values];
      chars.forEach((char, i) => {
        newValues[i] = char.toUpperCase();
      });
      updateValues(newValues);

      const nextIndex = Math.min(chars.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    },
    [values, isValidChar, length, updateValues]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    },
    []
  );

  return (
    <Wrapper>
      {Array.from({ length }).map((_, index) => (
        <Box
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode={type === "numeric" ? "numeric" : "text"}
          maxLength={2}
          value={values[index]}
          disabled={disabled}
          $validation={validation}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          onPaste={handlePaste}
          onFocus={handleFocus}
          autoComplete="one-time-code"
          aria-label={`Digit ${index + 1} of ${length}`}
        />
      ))}
    </Wrapper>
  );
};

export { CodeVerifier };
