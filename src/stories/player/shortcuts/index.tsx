import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrow-right.svg";
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

const PlayerShortCut = ({
  icon,
  type,
  children,
}: {
  icon?: React.ReactNode;
  type: "play/pause" | "mute" | "forward" | "backward" | "observation";
  children: React.ReactNode;
}) => {
  const getShortcut = () => {
    switch (type) {
      case "play/pause":
        return ["Space"];
      case "mute":
        return ["M"];
      case "forward":
        return [<ArrowRight />];
      case "backward":
        return [<ArrowLeft />];
      case "observation":
        return ["S"];
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

export { PlayerShortCut };
