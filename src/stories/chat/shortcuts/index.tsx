import styled from "styled-components";
import { ReactComponent as EnterIcon } from "../../../assets/icons/enter-stroke.svg";
import { ReactComponent as MentionIcon } from "../../../assets/icons/at-stroke.svg";
import { ShortcutTag } from "../../shortcut-tag";

const ShortcutItemWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  justify-content: space-between;

  .description {
    display: flex;
    gap: ${({ theme }) => theme.space.xs};
    align-items: center;
  }
`;

const ShortcutWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;

const ShortcutItem = ({
  icon,
  shortcut,
  children,
}: {
  icon?: React.ReactNode;
  shortcut: (React.ReactNode | "ctrl")[];
  children: React.ReactNode;
}) => (
  <ShortcutItemWrapper>
    <div className="description">
      <span>{icon}</span>
      <span>{children}:</span>
    </div>
    <ShortcutWrapper>
      {shortcut.map((key) => {
        if (key === "ctrl") return <ShortcutTag ctrl />;
        return <ShortcutTag text={key} />;
      })}
    </ShortcutWrapper>
  </ShortcutItemWrapper>
);

const ChatShortCut = ({
  icon,
  type,
  children,
}: {
  icon?: React.ReactNode;
  type: "bold" | "italic" | "send" | "mention";
  children: React.ReactNode;
}) => {
  const getShortcut = () => {
    switch (type) {
      case "bold":
        return ["ctrl", "B"];
      case "italic":
        return ["ctrl", "I"];
      case "send":
        return ["ctrl", <EnterIcon />];
      case "mention":
        return [<MentionIcon />];
      default:
        throw new Error(`Invalid type ${type}`);
    }
  };

  return (
    <ShortcutItem icon={icon} shortcut={getShortcut()}>
      {children}
    </ShortcutItem>
  );
};

export { ChatShortCut };
