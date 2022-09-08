import { Input } from "../input";
import { InputToggleArgs } from "./_types";
import styled from "styled-components";
import { useRef, useState, KeyboardEvent as ReactKeyboardEvent } from "react";
import { Label } from "../../label";
import { Message } from "../../dropdowns/select";
import { Span } from "../../typography/span";
import { theme } from "../../theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  border-radius: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom-width: 2px;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.xxs}`};
  width: 100%;

  &[readonly] {
    background-color: transparent;
    border-color: transparent;
    transition: border-color 0s;
  }

  &:focus {
    box-shadow: none;
    transition: border-color 0.2s ease-in-out 0.1s;
  }
`;

const StyledLabel = styled(Label)`
  transition: opacity 0.2s ease-in-out;
`;

const StyledMessage = styled(Message)`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const IconContainer = styled.div`
  margin-left: ${({ theme }) => theme.space.md};
  cursor: pointer;
`;

/**
 * An Input Toggle lets users use the input by activating it pressing the edit button.
 * <hr>
 * Used for this:
 *  - To let the user enter data into a field
 *  - To enter multiline text, use a Textarea
 **/
const InputToggle = (props: InputToggleArgs) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    validation,
    size,
    label,
    message,
    required,
    onBlur,
    placeholder,
    endIcon,
    style,
    ...rest
  } = props;

  const onClick = () => {
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      setIsEditing(false);
      inputRef.current?.blur();
    }
  };

  const handleOnBlur = () => {
    setIsEditing(false);
    inputRef.current?.blur();
  };

  return (
    <Wrapper {...(style && { style })}>
      {label && (
        <StyledLabel
          isRegular
          {...(isEditing
            ? { style: { opacity: 1 } }
            : { style: { opacity: 0 } })}
        >
          {label}
          {label && required ? (
            <Span style={{ color: theme.palette.red[600] }}>*</Span>
          ) : null}
        </StyledLabel>
      )}
      <InputContainer>
        <StyledInput
          placeholder={placeholder}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onBlur={(e) => {
            onBlur?.(e);
            handleOnBlur();
          }}
          ref={inputRef}
          {...(isEditing ? { readOnly: false } : { readOnly: true })}
          {...(size ? { style: { fontSize: `${size}px` } } : {})}
          {...(validation && { validation })}
          {...rest}
        />
        {!isEditing && endIcon && (
          <IconContainer onClick={onClick}>{endIcon}</IconContainer>
        )}
      </InputContainer>
      {message && (
        <StyledMessage
          validation={validation}
          {...(message ? { style: { opacity: 1 } } : { style: { opacity: 0 } })}
        >
          {message}
        </StyledMessage>
      )}
    </Wrapper>
  );
};

export { InputToggle };