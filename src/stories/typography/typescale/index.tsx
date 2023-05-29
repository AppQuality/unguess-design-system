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
const SM = styled(ZendeskSM)<{color?: string}>`
  ${p => p.color && `color: ${p.color}`};
`;
const MD = styled(ZendeskMD)<{color?: string}>`
  ${p => p.color && `color: ${p.color}`};
`;
const LG = styled(ZendeskLG)<{color?: string}>`
  ${p => p.color && `color: ${p.color}`};
`;
const XL = styled(ZendeskXL)<{color?: string}>`
${p => p.color && `color: ${p.color}`};
`;
const XXL = styled(ZendeskXXL)<{color?: string}>`
${p => p.color && `color: ${p.color}`};
`;
const XXXL = styled(ZendeskXXXL)<{color?: string}>`
  color: ${p => p.color || p.theme.palette.blue[600]};
`;
const TextLabel = () => styled(ZendeskSM)`
  color: ${ p => p.theme.palette.grey[600]};
`;
interface TextDescriptionProps extends ITypescaleMonospaceProps {
  isSmall?: boolean;
}
const TextDescription = ({isSmall, ...props}: TextDescriptionProps) => {
  return (
    {isSmall}
     ? <SM color={theme.palette.grey[700]} {...props} />
     : <MD color={theme.palette.grey[700]} {...props} />
  )
}

export { SM, MD, LG, XL, XXL, XXXL, TextLabel, TextDescription };
