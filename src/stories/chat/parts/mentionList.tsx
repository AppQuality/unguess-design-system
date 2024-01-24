import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { Card } from "../../cards";
import { Button } from "../../buttons/button";
import { styled } from "styled-components";
import { SuggestedUser } from "../_types";
import { MD } from "../../typography/typescale";
import { theme } from "../../theme";
import { ButtonArgs } from "../../buttons/button/_types";
import { getColor } from "../../theme/utils";

export type MentionListRef = {
  onKeyDown: NonNullable<
    ReturnType<
      NonNullable<SuggestionOptions<SuggestedUser>["render"]>
    >["onKeyDown"]
  >;
};

const StyledCard = styled(Card)`
  padding: ${({ theme }) => theme.space.xxs};

  ::-webkit-scrollbar {
    width: ${({ theme }) => theme.space.xs};
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
  max-height: 200px;
  overflow-y: auto;
`;

const Item = styled(Button)<ButtonArgs & { isActive?: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${getColor(
      theme.colors.primaryHue,
      600,
      undefined,
      0.08
    )};
  `}
`;

type MentionListProps = SuggestionProps<SuggestedUser>;

export const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const selectedRef = useRef<HTMLButtonElement>(null);
    const selectItem = (index: number) => {
      const item = props.items[index];

      if (item) {
        props.command(item);
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);
    useEffect(() => {
      if (selectedRef.current) {
        selectedRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [selectedIndex]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="items">
        <StyledCard>
          <List>
            {props.items.length ? (
              props.items.map((item, index) => (
                <div>
                  <Item
                    ref={index === selectedIndex ? selectedRef : undefined}
                    isBasic
                    isStretched
                    isAccent
                    isPill={false}
                    isActive={index === selectedIndex}
                    key={index}
                    onClick={() => selectItem(index)}
                  >
                    <MD isBold style={{ color: theme.palette.black }}>
                      {item.name}
                    </MD>
                  </Item>
                </div>
              ))
            ) : (
              <div className="item">No result</div>
            )}
          </List>
        </StyledCard>
      </div>
    );
  }
);
