import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";
import { Wrapper, IconWrapper, Quantity } from "./styles";



type IncrementorProps = {
  id: number;
  quantity?: number;
  onClickPlus: React.MouseEventHandler<HTMLButtonElement>;
  onClickMinus?: React.MouseEventHandler<HTMLButtonElement>;
};

const Incrementor = ({quantity,onClickPlus,onClickMinus}: IncrementorProps) => {
  
    
return (
    <Wrapper>
      <IconWrapper onClick={onClickMinus} >
        <SubtractIcon aria-label="Subtract item" />
      </IconWrapper>
  
      <Quantity>{quantity}</Quantity>
  
      <IconWrapper onClick={onClickPlus}>
        <PlusIcon  aria-label="Add item" />
      </IconWrapper>
    </Wrapper>
    );
  
}
export default Incrementor;
