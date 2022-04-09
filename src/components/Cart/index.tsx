import { Dispatch, SetStateAction, useEffect} from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";
import Product from "../Product";

import { Wrapper, Subtotal, Header } from "./styles";
import { useProducts } from "../../context/Products";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};




const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) =>{
  const {cart,toogle} = useProducts();

  useEffect(() => {},[toogle])


return (
    <Wrapper isOpen={isOpen}>
      <Header>
        <Typography level={5} size="large" fontWeight={600}>
          {cart.map(product =>
            <Product
            key={product.id}
            id={product.id}
            picture={product.picture}
            name={product.name}
            price={product.price}
            />
            )}
        </Typography>
        <CloseOutline onClick={() => setIsOpen(false)} />
      </Header>
  
      <Subtotal>
        <Typography level={5} size="large" fontWeight={600}>
          Total
        </Typography>
        <Typography>1,600.50</Typography>
      </Subtotal>
  
      <Button fullWidth>Finalizar compra</Button>
    </Wrapper>
  );
} 

export default MenuPayment;
