import styled from "styled-components";

const Wrapper = styled.span<{
  display: NonNullable<React.CSSProperties["display"]>;
}>`
  display: block;
  width: 4px;
  height: 4px;
  background-color: #ff00dc;
`;

const Placeholder = ({
  display = "inline-block",
}: {
  display?: React.CSSProperties["display"];
}) => {
  return <Wrapper display={display} />;
};

export { Placeholder };
