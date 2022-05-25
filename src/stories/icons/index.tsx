import styled from "styled-components";
import { ReactComponent as UnguessSquare } from "../../assets/icons/ug_square.svg";
import { ReactComponent as UnguessCircle } from "../../assets/icons/ug_circle.svg";
import { ReactComponent as UnguessTriangle } from "../../assets/icons/ug_triangle.svg";
import { IconArgs } from "./_types";

const StyledUgIcon = styled.span``;

const Icon = (props: IconArgs) => {
  const { type, size } = props;
  const dim = size ?? 24;

  return (
    <StyledUgIcon>
      {type === "square" && <UnguessSquare width={dim} height={dim} />}
      {type === "triangle" && <UnguessTriangle width={dim} height={dim} />}
      {type === "circle" && <UnguessCircle width={dim} height={dim} />}
    </StyledUgIcon>
  );
};

export { Icon };
