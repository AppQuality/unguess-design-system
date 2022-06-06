import styled from "styled-components";
import { CardThumbProps } from "../_types";

export const CardThumbnail = styled.div<CardThumbProps>`
  ${({ theme, align, isStretched }) => `
    display: flex;

    ${!isStretched ? `max-width: ${theme.space.base * 16}px` : ""};
    max-height: ${isStretched ? '150px' : `${theme.space.base * 16}px`};
    ${align === "left" ? `margin-right: auto;`: ''}
    ${align === "right" ? `margin-left: auto;`: ''}
    ${align === "center" || isStretched ? `margin: auto;`: ''}

    padding: ${theme.space.xxs} 0;

    svg {
        width: 100%;
        height: auto;
    }
  `}
`;

CardThumbnail.defaultProps = {
  align: "left"
};
