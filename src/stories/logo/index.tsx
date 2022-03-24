import { LogoArgs } from './_types';
import LogoHorizontal from '../../assets/logo-horizontal.svg';
import LogoVertical from '../../assets/logo-vertical.svg';
import LogoIcon from '../../assets/logo-icon.svg';

/**
 * A Logo is a visual way to represent a brand logo.
 * <hr>
 * Used for this:
 *  - To visually represent a brand or product
 * 
 * Not for this:
 *  - To visually represent a common image
 */

const Logo = (props: LogoArgs) => {
   return (
      <img
         {...props && !props.type}
         {...props && props.type === "horizontal" && {width: `${props.size}`}}
         {...props && props.type === "vertical" && {height: `${props.size}`}}
         {...props && props.type === "icon" && {width: `${props.size}`} && {height: `${props.size}`}}
         className={props.className}
         alt={props.alt ?? "Unguess Logo"}
         src={{
            'horizontal': LogoHorizontal,
            'vertical': LogoVertical,
            'icon': LogoIcon,
         }[props.type]}
      />
   );
}

export { Logo };
