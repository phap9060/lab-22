import Incrementor from "../Incrementor";
import { useProducts } from "../../context/Products";
import { Wrapper, Info, Column, Text, WrapperIncrementor,Alert } from "./styles";
import { useEffect, useState } from "react";

export type ProductProps = {
  id: number;
  name: string;
  price: number;
  picture: string;
  stock: number;
};

const Product = ({id, name, price, picture,stock}: ProductProps) =>{
  const {setCart,setCleanCart,allProducts,setAllProducts,setExcludeProducts,toogle,setToogle,values,setValue} = useProducts()
  const [quantity,setQuantity] = useState(0)
  const [alert,setAlert]=useState(false)

 
  const changeQuantityPlus = () => {
    if(quantity === stock){
      setAlert(true)
    }
    if(quantity < stock){
      setAlert(false)
      setAllProducts(id)
    }
  }
  const changeQuantityMinus = () => {
    setAlert(false)
    const newAllProducts = allProducts
    newAllProducts.splice(newAllProducts.indexOf(id), 1)
    setExcludeProducts(newAllProducts)
    setValue(id,price)
  }
  const formatedPrice = () => {
    let realPrice:number = price
    if (quantity > 0){
      realPrice = quantity * price
    }
    const formatedPrice = realPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return formatedPrice
  }
  const addOnCart = () => {
      setCart(id,name,picture,price,stock)
  }

  const unitValue = () => {
    return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  }
  const cartOperations = () => {
    let count = 0
    allProducts.forEach(product => {
      if (id === product) {
        count++
      }
    })
    if (count === 0) {setCleanCart(id);setValue(id,price)}
    setValue(id,count*price)
    setQuantity(count)
  }
  
 
  useEffect(() => {
    cartOperations()
  },[toogle]) 
 
  
  return (
    <Wrapper>
      <img src={picture} alt={`Imagem de referência ${name}`} />
      <Info>
        <Column>
          <Text>{name}</Text>
          <Text>Unidade em estoque:{stock}</Text>
          <Text>Valor da unidade: {unitValue()}</Text>
          <Text>{formatedPrice()}</Text>
          
        </Column>
       {alert && <Alert>Esse é a quantidade máxima de produtos,<br/>devido a quantidade em estoque</Alert>}
        <WrapperIncrementor>
          <Incrementor 
          id={id} quantity={quantity} 
          onClickPlus={()=>{;addOnCart();changeQuantityPlus();setToogle()}}
          onClickMinus={()=>{changeQuantityMinus();setToogle()}} 
          />
        </WrapperIncrementor>
      </Info>
    </Wrapper>
  );
  
}




export default Product;





