import Incrementor from "../Incrementor";
import { useProducts } from "../../context/Products";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";
import { useEffect, useState } from "react";

export type ProductProps = {
  id: number;
  name: string;
  price: number;
  picture: string;
};

const Product = ({id, name, price, picture}: ProductProps) =>{
  const {setCart,allProducts,setAllProducts,setExcludeProducts,toogle,setToogle} = useProducts()
  const [quantity,setQuantity] = useState(0)
  

  const changeQuantityPlus = () => {
    setQuantity(() => quantity + 1)
  }
  const changeQuantityMinus = () => {
    const newAllProducts = allProducts
    const position = newAllProducts.indexOf(id)
    newAllProducts.splice(position, 1)
    setExcludeProducts(newAllProducts)
    setQuantity(() => quantity - 1)
  }
 
  const formatPrice = () => {
    let realPrice:number = price
    if (quantity > 0){
      realPrice = quantity * price
    }
    const formatedPrice = realPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return formatedPrice
  }
  const addOnCart = () => {
      setCart(id,name,picture,price)
  }
 
  useEffect(() => {
    let count = 0
    allProducts.forEach(product => {
      if (id === product) {
        count++
      }
    })
    setQuantity(count)
  },[toogle]) 
 
  
  return (
    <Wrapper>
      <img src={picture} alt={`Imagem de referência ${name}`} />
      <Info>
        <Column>
          <Text>{name}</Text>
          <Text>{formatPrice()}</Text>
        </Column>
        <WrapperIncrementor>
          <Incrementor 
          id={id} quantity={quantity} 
          onClickPlus={()=>{addOnCart();changeQuantityPlus();setAllProducts(id);setToogle()}} 
          onClickMinus={()=>{changeQuantityMinus();setToogle()}} 
          />
        </WrapperIncrementor>
      </Info>
    </Wrapper>
  );
  
}




export default Product;





