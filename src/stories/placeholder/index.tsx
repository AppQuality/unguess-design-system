import styled from "styled-components";

const Wrapper = styled.span`
  display: inline-block;
  padding: 10px;
  background-color: #ccc;
  width: 100%;
  .content {
    display: inline-block;
    width: 100%;
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
