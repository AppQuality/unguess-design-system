import { Progress as ZendeskProgress } from "@zendeskgarden/react-loaders";
import { forwardRef } from "react";
import styled from "styled-components";
import { ProgressArgs } from "./_types";

const UgProgress = styled(ZendeskProgress)``;

/**
 * A Progress loader communicates progress when downloading or uploading content.
 * <hr>
 * Used for this:
 * - To communicate the amount of time left when downloading or uploading content
 *
   Not for this:
    - When the loading time is unknown, use a Spinner instead
    - When loading page content, use a Skeleton loader instead
 */
const Progress = forwardRef<HTMLDivElement, ProgressArgs>((props, ref) => (
  <UgProgress ref={ref} {...props} />
));

export { Progress };
