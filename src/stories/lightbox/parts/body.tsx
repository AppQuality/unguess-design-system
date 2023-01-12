import styled from "styled-components";
import { Modal } from "../../modals";

const StyledBody = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: nowrap;
  padding: 0;
  min-height: 0;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: 66.66666667%;
  padding: ${({ theme }) => theme.space.sm};
  overflow: auto;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: 33.33333333%;
  padding: ${({ theme }) => theme.space.md};
  overflow: auto;
`;

export const ModalBody = StyledBody as typeof StyledBody & {
  Main: typeof MainContent;
  Details: typeof Details;
};

ModalBody.Main = MainContent;
ModalBody.Details = Details;
