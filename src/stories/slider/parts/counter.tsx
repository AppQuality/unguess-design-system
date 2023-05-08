import styled from "styled-components";
import { Tag } from "../../tags";
import { theme } from "../../theme";
import { SM } from "../../typography/typescale";
import { getColor } from "../../theme/utils";

const StyledTag = styled(Tag)`
  position: absolute;
  top: ${({ theme }) => theme.space.sm};
  right: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  z-index: 1;
`;

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
  span {
    color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
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
