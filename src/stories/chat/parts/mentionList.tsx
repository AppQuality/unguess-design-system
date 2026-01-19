import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { Button } from "../../buttons/button";
import { ButtonArgs } from "../../buttons/button/_types";
import { Card } from "../../cards";
import { theme } from "../../theme";
import { getColor } from "../../theme/utils";
import { MD, SM } from "../../typography/typescale";
import { ChatEditorArgs, SuggestedUser } from "../_types";

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
  border: none;

  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${getColor(theme.colors.primaryHue, 600, undefined, 0.2)};
  `}
`;
const EmptyList = styled.div`
  max-height: 100px;
  max-width: 280px;
  padding: ${({ theme }) => `${theme.space.xxs} ${theme.space.md}`};
`;

const EmptyMention = ({ content }: { content: string }) => {
  return (
    <EmptyList>
      <MD style={{ color: theme.palette.grey[600] }}>{content}</MD>
    </EmptyList>
  );
};

type MentionListProps = SuggestionProps<SuggestedUser>;

export const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const { editor } = props;
    const { options } = editor;
    const { i18n } = options as ChatEditorArgs;
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
        (selectedIndex + props.items.length - 1) % props.items.length,
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
                    <MD style={{ color: theme.palette.grey[800] }}>
                      {item.name}
                    </MD>
                    <SM style={{ color: theme.palette.grey[600] }}>
                      {item.email}
                    </SM>
                  </Item>
                </div>
              ))
            ) : (
              <EmptyMention
                content={i18n?.mention?.noResults ?? "No results"}
              />
            )}
          </List>
        </StyledCard>
      </div>
    );
  },
);
