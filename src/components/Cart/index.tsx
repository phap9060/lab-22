import { Dispatch, SetStateAction, useEffect, useState} from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";
import Product from "../Product";

import { Wrapper, Subtotal, Header } from "./styles";
import { useProducts } from "../../context/Products";
import { Cart } from "styled-icons/bootstrap";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};




const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) =>{
  const {cart,values,setValue,toogle} = useProducts();
  const [totalValue,setTotalValue] = useState('')
  
  const calculateTotalPrice = () => {
    if(cart.length > 0){
      let total = 0
      values.forEach(product => {
        console.log(product)
        total += Number(product.totalValue)
      })
      let newTotal= total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
      return setTotalValue(newTotal)
    }  
    if(cart.length===0){
     return setTotalValue('R$ 0,00')
    }
    
  }
  useEffect(() => {
    calculateTotalPrice()
  },[values,toogle])
 
 


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
            stock={product.quantity}
            />
            )}
        </Typography>
        <CloseOutline onClick={() => setIsOpen(false)} />
      </Header>
  
      <Subtotal>
        <Typography level={5} size="large" fontWeight={600}>
          Total
        </Typography>
        <Typography>{totalValue}</Typography>
      </Subtotal>
  
      <Button fullWidth>Finalizar compra</Button>
    </Wrapper>
  );
} 

export default MenuPayment;
