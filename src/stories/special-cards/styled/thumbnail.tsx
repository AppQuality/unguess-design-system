import styled from "styled-components";
import { CardThumbProps } from "../_types";

export const CardThumbnail = styled.div<CardThumbProps>`
  ${({ theme, align }) => `
    width: 100%;
    max-width: ${theme.space.base * 16}px;
    max-height: ${theme.space.base * 16}px;
    height: 100%;
    ${align === "left" ? `margin-right: auto;`: ''}
    ${align === "center" ? `margin: auto;`: ''}
    ${align === "right" ? `margin-left: auto;`: ''}

    padding: ${theme.space.xxs} 0;

    svg {
        width: 100%;
    }
  `}
`;

CardThumbnail.defaultProps = {
  align: "left"
};
