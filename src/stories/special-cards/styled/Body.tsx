import styled from "styled-components";

export const CardBody = styled.div<{ lines?: number }>`
  color: ${({ theme }) => theme.palette.grey[700]};
  
  ${({ lines }) => `
  display: -webkit-box;
  line-clamp: ${lines};
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  `}
`;