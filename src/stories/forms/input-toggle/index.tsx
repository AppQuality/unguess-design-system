import { Input } from "../input";
import { InputToggleArgs } from "./_types";
import styled from "styled-components";
import { useRef, useState, KeyboardEvent as ReactKeyboardEvent } from "react";
import { ReactComponent as EditIcon } from "../../../assets/icons/input-toggle-edit.svg";
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
  cursor: pointer;
`;

const StyledInput = styled(Input)`
  border-radius: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom-width: 2px;
  width: 100%;

  &[readonly] {
    background-color: transparent;
    border-color: transparent;
    transition: border-color 0s;
  }

  &:focus {
    box-shadow: none;
    transition: border-color 0.2s ease-in-out 0.2s;
  }
`;

const StyledEditIcon = styled(EditIcon)`
  margin: ${({ theme }) => theme.space.md};
`;

const StyledLabel = styled(Label)`
  transition: opacity 0.2s ease-in-out;
`;

const StyledMessage = styled(Message)`
  margin-top: ${({ theme }) => theme.space.sm};
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

  const onBlur = () => {
    setIsEditing(false);
    inputRef.current?.blur();
  };

  return (
    <Wrapper onClick={onClick} onKeyDown={onKeyDown} onBlur={onBlur}>
      {props.label && (
        <StyledLabel
          isRegular={true}
          {...(isEditing
            ? { style: { opacity: 1 } }
            : { style: { opacity: 0 } })}
        >
          {props.label}
          {props.label && props.required ? (
            <Span style={{ color: theme.palette.red[600] }}>*</Span>
          ) : null}
        </StyledLabel>
      )}
      <InputContainer>
        <StyledInput
          ref={inputRef}
          {...props}
          {...(isEditing ? { readOnly: false } : { readOnly: true })}
          {...(props.size ? { style: { fontSize: `${props.size}px` } } : {})}
        />
        {!isEditing && <StyledEditIcon />}
      </InputContainer>
      {props.message && (
        <StyledMessage
          validation={props.validation}
          {...(props.message
            ? { style: { opacity: 1 } }
            : { style: { opacity: 0 } })}
        >
          {props.message}
        </StyledMessage>
      )}
    </Wrapper>
  );
};

export { InputToggle };
