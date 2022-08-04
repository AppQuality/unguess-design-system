import { ItemContentArgs } from "./_types";
import styled from "styled-components";
import { MD, SM } from "../../typography/typescale";
import { memo } from "react";

interface Image {
  src: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ThumbContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.space.sm};
  width: 100%;
  max-width: ${({ theme }) => theme.components.autocomplete.thumbSize};

  > div {
    height: 100%;
  }
`;

const Label = styled(MD)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const Description = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const Image = memo(({ src }: Image) => {
  return <img src={src} />;
});

const ItemContent = (props: ItemContentArgs) => {
  const { thumbSrc, description, label } = props;

  return (
    <Container>
      {thumbSrc && (
        <ThumbContainer>
          <Image src={thumbSrc} />
        </ThumbContainer>
      )}
      <MetaContainer>
        {label && <Label isBold>{label}</Label>}
        {description && <Description>{description}</Description>}
      </MetaContainer>
    </Container>
  );
};

export { ItemContent };
