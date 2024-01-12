import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { Card } from "../../cards";

export type MentionListRef = {
  onKeyDown: NonNullable<
    ReturnType<
      NonNullable<SuggestionOptions<SuggestedUser>["render"]>
    >["onKeyDown"]
  >;
};

export type SuggestedUser = { id: number; name: string; avatar: string };

type MentionListProps = SuggestionProps<SuggestedUser>;

export const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const selectItem = (index: number) => {
      const item = props.items[index];
      console.log("🚀 ~ selectItem ~ item:", item);

      if (item) {
        props.command(item);
      }
    };

    const upHandler = () => {
      console.log(
        "🚀 ~ file: mentionList.tsx:126 ~ upHandler ~ selectedIndex",
        selectedIndex
      );
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      console.log(
        "🚀 ~ file: mentionList.tsx:133 ~ downHandler ~ selectedIndex",
        selectedIndex
      );
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      console.log(
        "🚀 ~ file: mentionList.tsx:140 ~ enterHandler ~ selectedIndex",
        selectedIndex
      );
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

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
        <Card>
          {props.items.length ? (
            props.items.map((item, index) => (
              <button
                className={`item ${
                  index === selectedIndex ? "is-selected" : ""
                }`}
                key={index}
                onClick={() => selectItem(index)}
              >
                {item.name}
              </button>
            ))
          ) : (
            <div className="item">No result</div>
          )}
        </Card>
      </div>
    );
  }
);
