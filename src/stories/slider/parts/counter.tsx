import styled from "styled-components";
import { Tag } from "../../tags";
import { theme } from "../../theme";
import { SM } from "../../typography/typescale";

const StyledTag = styled(Tag)`
  position: absolute;
  top: 0;
  right: -${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.xs}${theme.space.sm}`};
  z-index: 1;
`;

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

export const SliderCounter = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  return (
    <StyledTag isPill hue={theme.palette.white}>
      <StyledSM>
        <span>{current + 1}</span>/{total}
      </StyledSM>
    </StyledTag>
  );
};
