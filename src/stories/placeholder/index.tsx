import styled from "styled-components";

const Wrapper = styled.span`
  display: inline-block;
  padding: 10px;
  background-color: #ccc;
  .content {
    display: inline-block;
    padding: 10px;
    background-color: #fff;
  }
`;

const Placeholder = () => {
  return (
    <Wrapper>
      <span className="content">PLACEHOLDER</span>
    </Wrapper>
  );
};

export { Placeholder };
