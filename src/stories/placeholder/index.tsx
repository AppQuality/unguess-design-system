import styled from "styled-components";

const Wrapper = styled.span<{
  display: NonNullable<React.CSSProperties["display"]>;
}>`
  display: ${(props) => props.display};
  padding: 10px;
  border: 10px solid #e0e0e0;
  background-color: #fff;
  width: ${(props) => (["block"].includes(props.display) ? "100%" : "auto")};
`;

const Placeholder = ({
  display = "inline-block",
}: {
  display?: React.CSSProperties["display"];
}) => {
  return <Wrapper display={display}>PLACEHOLDER</Wrapper>;
};

export { Placeholder };
