import styled from "styled-components";
import { ReactComponent as UnguessSquare } from '../../../assets/icons/ug_square.svg'
import { ReactComponent as UnguessCircle } from '../../../assets/icons/ug_circle.svg'
import { ReactComponent as UnguessTriangle } from '../../../assets/icons/ug_triangle.svg'

const StyledUgIcon = styled.span`
  svg {
    width: 12px;
    height: 12px;
  }
`

const UgIcon = (props: any) => {
  const children = (type: string) => {
    if (type === "square") return <UnguessSquare />
    if (type === "triangle") return <UnguessTriangle />
    if (type === "circle") return <UnguessCircle />
  }
  return (
    <StyledUgIcon>
      {children(props.type)}
    </StyledUgIcon>
  )

};

export { UgIcon };
