import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { Container } from "../components/Container";
import Header from "../components/Header";
import Product from "../components/Product";
import { useProducts } from "../context/Products";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { products,setProducts } = useProducts();
  useEffect(() => {
    setProducts()
  },[setProducts])


  return (
    <>
    <Header setIsOpen={setIsOpen} />
      <Container>
      {products.map(product => 
      <Product
      key={product.id}
      id={product.id}
      picture={product.picture}
      name={product.name}
      price={product.price}
      />
      )}
      <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
      </Container>
    </>
  );
};

export default Home;




