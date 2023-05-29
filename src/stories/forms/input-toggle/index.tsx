import styled from "styled-components";
import {
  useRef,
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from "react";
import { Input } from "../input";
import { InputToggleArgs, textSizes } from "./_types";
import { ReactComponent as EditIcon } from "../../../assets/icons/notes-stroke.svg";
import { Label } from "../../label";
import { XL } from "../../typography/typescale";
import { theme } from "../../theme";

interface IInputToggleContext {
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
}

const ToggleContext = createContext<IInputToggleContext>({});

const StyledInput = styled(Input)`
  border-radius: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom-width: 2px;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.xxs}`};
  width: 100%;

  &:focus {
    box-shadow: none;
    transition: border-color 0.2s ease-in-out 0.1s;
  }
`;

const StyledLabel = styled(Label)`
  padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.xxs} 0`};
  transition: opacity 0.2s ease-in-out;
`;

const StyledText = styled(XL)``;

const Wrapper = styled.div<InputToggleArgs>`
  display: flex;
  flex-direction: column;

  ${StyledText} {
    border-bottom: 2px solid transparent;
    padding: ${({ theme }) => `${theme.space.xs} ${theme.space.xxs}`};
    display: flex;
    align-items: center;

    svg {
      margin-left: ${({ theme }) => theme.space.xs};
    }
  }
`;

/*
 * An Input Toggle lets users use the input by activating it pressing the edit button.
 * <hr>
 * Used for this:
 *  - To let the user enter data into a field
 *  - To enter multiline text, use a Textarea
 */
const InputToggle = ({ isFocused, ...props }: InputToggleArgs) => {
  const [isEditing, setIsEditing] = useState<boolean>(!!isFocused);
  const context = useMemo(() => ({ isEditing, setIsEditing }), [isEditing]);
  const container = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsEditing(true);
    container.current?.focus();
  };

  useEffect(() => {
    if (isFocused) {
      handleClick();
    }
  }, []);

  return (
    <ToggleContext.Provider value={context}>
      <Wrapper
        ref={container}
        onClick={handleClick}
        onBlur={() => setIsEditing(false)}
        {...props}
      />
    </ToggleContext.Provider>
  );
};

const getInputSize = (textSize: textSizes) => ({
  fontSize: textSize in theme.fontSizes ? theme.fontSizes[textSize] : "22px",
  lineHeight:
    textSize in theme.lineHeights ? theme.lineHeights[textSize] : "28px",
});

const InputItem = (props: InputToggleArgs) => {
  const {
    placeholder = "Insert a value",
    value,
    style,
    textSize = "xl",
  } = props;
  const [input, setInput] = useState<HTMLInputElement | null>();

  const { isEditing } = useContext(ToggleContext);

  const size = getInputSize(textSize);

  useEffect(() => {
    if (isEditing && input) {
      input.focus();
    }
  }, [isEditing, input]);

  return isEditing ? (
    <StyledInput
      ref={setInput}
      {...props}
      style={{ fontWeight: 500, ...size, ...style }}
    />
  ) : (
    <StyledText isBold style={{ fontWeight: 500, ...size, ...style }}>
      {!value ? placeholder : value} <EditIcon />
    </StyledText>
  );
};

InputToggle.Item = InputItem;
InputToggle.Label = StyledLabel;

export { InputToggle };
