import styled from "styled-components";
import { LG, MD, SM } from "../../typography/typescale";
import { CardHeaderProps } from "../_types";

const Label = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const Title = styled(LG)`
  color: ${({ theme }) => theme.colors.primaryHue};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-top: ${({ theme }) => theme.space.xxs};
`;

const Description = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[700]};
  margin-top: ${({ theme }) => theme.space.xxs};
`;

const Container = styled.div<CardHeaderProps>`
  ${({ theme, align }) => `
    display: flex;
    align-items: ${align || "start"};
    flex-direction: column;
    flex-grow: 1;
    justify-content: start;
    padding: ${theme.space.xxs} 0;
    margin-top: ${theme.space.xs};
  `}
`;

const CardHeader = (props: CardHeaderProps) => <Container {...props} />;

CardHeader.Label = Label;
CardHeader.Title = Title;
CardHeader.Text = Description;

export { CardHeader };
