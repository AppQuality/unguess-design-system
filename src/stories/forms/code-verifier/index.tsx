import styled, { css } from "styled-components";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";
import { CodeVerifierArgs, CodeVerifierRef } from "./_types";

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
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  outline: none;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  color: ${({ theme }) => theme.palette.grey[800]};
  background: ${({ theme }) => theme.palette.white};
  caret-color: ${({ theme }) => theme.palette.blue[600]};

  &:focus {
    border-color: ${({ theme }) => theme.palette.blue[600]};
    box-shadow:
      0 0 0 1px ${({ theme }) => theme.palette.white},
      0 0 0 3px ${({ theme }) => theme.palette.blue[600]};
  }

  &:disabled {
    background: ${({ theme }) => theme.palette.grey[100]};
    border-color: ${({ theme }) => theme.palette.grey[200]};
    color: ${({ theme }) => theme.palette.grey[400]};
    cursor: not-allowed;
  }

  ${({ $validation }) => $validation && validationColors[$validation]}
`;

const CodeVerifier = forwardRef<CodeVerifierRef, CodeVerifierArgs>(
  (
    {
      length,
      type = "numeric",
      validation,
      disabled = false,
      value,
      autoFocus = false,
      onComplete,
      onChange,
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const parseValue = useCallback(
      (val: string | undefined): string[] => {
        if (val === undefined) return Array(length).fill("");
        return Array.from({ length }, (_, i) => val[i]?.toUpperCase() ?? "");
      },
      [length],
    );

    const [internalValues, setInternalValues] = useState<string[]>(
      parseValue(value),
    );
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const values = isControlled ? parseValue(value) : internalValues;

    useEffect(() => {
      if (isControlled) {
        setInternalValues(parseValue(value));
      }
    }, [isControlled, value, parseValue]);

    useEffect(() => {
      if (!isControlled) {
        setInternalValues((prev) => {
          if (prev.length === length) return prev;
          return Array.from({ length }, (_, i) => prev[i] ?? "");
        });
      }
    }, [length, isControlled]);

    useEffect(() => {
      if (autoFocus && !disabled) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus, disabled]);

    const prevDisabledRef = useRef(disabled);
    useEffect(() => {
      if (prevDisabledRef.current && !disabled && autoFocus) {
        const firstEmpty = values.findIndex((v) => v === "");
        const idx = firstEmpty === -1 ? 0 : firstEmpty;
        inputRefs.current[idx]?.focus();
      }
      prevDisabledRef.current = disabled;
    }, [disabled, autoFocus, values]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        const empty = Array(length).fill("");
        setInternalValues(empty);
        onChange?.("");
        inputRefs.current[0]?.focus();
      },
      focus: () => {
        const firstEmpty = values.findIndex((v) => v === "");
        const idx = firstEmpty === -1 ? 0 : firstEmpty;
        inputRefs.current[idx]?.focus();
      },
    }));

    const isValidChar = useCallback(
      (char: string) => {
        if (type === "numeric") return /^\d$/.test(char);
        return /^[a-zA-Z0-9]$/.test(char);
      },
      [type],
    );

    const updateValues = useCallback(
      (newValues: string[]) => {
        if (!isControlled) {
          setInternalValues(newValues);
        }
        const code = newValues.join("");
        onChange?.(code);
        if (code.length === length && newValues.every((v) => v !== "")) {
          onComplete?.(code);
        }
      },
      [length, onChange, onComplete, isControlled],
    );

    const handleChange = useCallback(
      (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;

        if (inputValue === "") {
          const newValues = [...values];
          if (newValues[index] !== "") {
            newValues[index] = "";
            updateValues(newValues);
          }
          return;
        }

        if (inputValue.length > 1) {
          const newValues = [...values];
          let currentIndex = index;
          for (const rawChar of inputValue) {
            if (currentIndex >= length) break;
            const upperChar = rawChar.toUpperCase();
            if (!isValidChar(upperChar)) continue;
            newValues[currentIndex] = upperChar;
            currentIndex += 1;
          }
          updateValues(newValues);
          if (currentIndex < length) {
            inputRefs.current[currentIndex]?.focus();
          } else {
            inputRefs.current[length - 1]?.blur();
          }
          return;
        }

        const char = inputValue.slice(-1);
        if (!isValidChar(char)) return;

        const newValues = [...values];
        newValues[index] = char.toUpperCase();
        updateValues(newValues);

        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      },
      [values, isValidChar, updateValues, length],
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
        } else if (e.key === "Delete") {
          e.preventDefault();
          if (values[index]) {
            const newValues = [...values];
            newValues[index] = "";
            updateValues(newValues);
          }
        } else if (e.key === "ArrowLeft" && index > 0) {
          inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      },
      [values, updateValues, length],
    );

    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const startIndexRaw = inputRefs.current.findIndex(
          (input) => input === target,
        );
        const startIndex = startIndexRaw === -1 ? 0 : startIndexRaw;
        const maxChars = Math.max(0, length - startIndex);
        const pasted = e.clipboardData.getData("text/plain").trim();
        const chars = pasted.split("").filter(isValidChar).slice(0, maxChars);
        if (chars.length === 0) return;

        const newValues = [...values];
        chars.forEach((char, i) => {
          const idx = startIndex + i;
          if (idx < length) {
            newValues[idx] = char.toUpperCase();
          }
        });
        updateValues(newValues);

        const nextIndex = Math.min(startIndex + chars.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
      },
      [values, isValidChar, length, updateValues],
    );

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    }, []);

    const ariaPrefix = type === "numeric" ? "Digit" : "Character";

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
            aria-label={`${ariaPrefix} ${index + 1} of ${length}`}
          />
        ))}
      </Wrapper>
    );
  },
);

CodeVerifier.displayName = "CodeVerifier";

export { CodeVerifier };
export type { CodeVerifierArgs, CodeVerifierRef } from "./_types";
