import {
  SM as ZendeskSM,
  MD as ZendeskMD,
  LG as ZendeskLG,
  XL as ZendeskXL,
  XXL as ZendeskXXL,
  XXXL as ZendeskXXXL
} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { ITypescaleMonospaceProps } from "@zendeskgarden/react-typography/dist/typings/types";
import { theme } from "../../theme";

/**
 *  Type components come in small, medium, large, extra-large, extra-extra-large, and extra-extra-extra-large.
 */
const SM = styled(ZendeskSM)`
  color: ${p => p.theme.palette.grey[800]};
`;
const MD = styled(ZendeskMD)`
  color: ${p => p.theme.palette.grey[800]};
`;
const LG = styled(ZendeskLG)`
  color: ${p => p.theme.palette.grey[800]};
`;
const XL = styled(ZendeskXL)`
  color: ${p => p.theme.palette.grey[800]};
`;
const XXL = styled(ZendeskXXL)`
  color: ${p => p.theme.palette.grey[800]};
`;
const XXXL = styled(ZendeskXXXL)`
  color: ${p => p.theme.palette.blue[600]};
`;
const TextLabel = styled(ZendeskSM)`
  color: ${ p => p.theme.palette.grey[600]};
`;
interface TextDescriptionProps extends ITypescaleMonospaceProps {
  isSmall?: boolean;
}
const TextDescription = ({isSmall, ...props}: TextDescriptionProps) => {
  return (
    {isSmall}
     ? <SM style={{color: theme.palette.grey[700]}} {...props} />
     : <MD style={{color: theme.palette.grey[700]}} {...props} />
  )
}

export { SM, MD, LG, XL, XXL, XXXL, TextLabel, TextDescription };
