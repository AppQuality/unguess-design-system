import styled from "styled-components";
import { ReactComponent as UnguessSquare } from '../../assets/icons/ug_square.svg'
import { ReactComponent as UnguessCircle } from '../../assets/icons/ug_circle.svg'
import { ReactComponent as UnguessTriangle } from '../../assets/icons/ug_triangle.svg'
import { IconArgs } from './_types';

const StyledUgIcon = styled.span``

const Icon = (props: IconArgs) => {
  const children = (type: string, size: number = 24) => {
    if (type === "square") return <UnguessSquare {...props && !props.size} {...props && {width: size, height: size}} />
    if (type === "triangle") return <UnguessTriangle {...props && !props.size} {...props && {width: size, height: size}} />
    if (type === "circle") return <UnguessCircle {...props && !props.size} {...props && {width: size, height: size}} />
  }
  return (
    <StyledUgIcon>
      {children(props.type, props.size)}
    </StyledUgIcon>
  )

};

export { Icon };
