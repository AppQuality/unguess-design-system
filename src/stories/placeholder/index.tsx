import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px;
  background-color: #ccc;
  .content {
    padding: 10px;
    background-color: #fff;
  }
`;

const Placeholder = () => {
  return (
    <Wrapper>
      <div className="content">PLACEHOLDER</div>
    </Wrapper>
  );
};

export { Placeholder };
