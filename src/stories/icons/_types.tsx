import { SVGProps } from "react";
export interface IconArgs extends SVGProps<SVGSVGElement> {
  /** Specifies the icon type */
  type: 'square' | 'triangle' | 'circle';
  /** Specifies icon size */
  size?: number;
}
