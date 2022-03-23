import { IChromeProps } from '@zendeskgarden/react-chrome';

export interface ChromeArgs extends IChromeProps {
    /** Applies a custom hue to the chrome navigation */
    hue?: string;
    /** Prevents fixed positioning from being applied to the `<html>` element */
    isFluid?: boolean;
}