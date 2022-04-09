import create from "zustand";
import axios from "axios";


type apiData = {
    id: number,
    name: string,
    picture: string,
    price: number,
    quantity?: number
}

type Data = {
    products:apiData[];
    setProducts: () => void;
    cart:apiData[];
    setCart: (id:number,name:string,picture:string,price:number) => void;
    allProducts:number[],
    setAllProducts: (id:number)=>void,
    setExcludeProducts:(array:number[])=>void,
    toogle:boolean,
    setToogle:()=>void,
   
    
};


export const useProducts = create<Data>(set => ({
    products:[],
    setProducts: async () => {
        const response = await axios.get('http://localhost:3001/products')
        set(()=>({products:response.data}))
    },
    cart:[],
    setCart: (id:number,name:string,picture:string,price:number) => {
    set(({cart})=>{
        let permission = true 
        cart.forEach(products => {
            if (products.id === id) permission = false
        })
        if(permission) {
            return {cart:[...cart,{id,name,picture,price}]}
        }
        return {cart}
    })
    },
    allProducts:[],
    setAllProducts: (id) => { set(({allProducts})=>( {allProducts:[...allProducts,id]}  )) },
    setExcludeProducts: (array) => { set(()=>( {allProducts:array}  )) },
    toogle:false,
    setToogle: () => { set(({toogle})=>({toogle:!toogle})) }
    
}));

