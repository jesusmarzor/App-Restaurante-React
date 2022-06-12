import { useState, useEffect } from "react";
export function useCart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect( () => {
        let dataCart = JSON.parse(localStorage.getItem('cart'));
        if(dataCart !== null){
            setCart(dataCart);
            setTotal(dataCart.reduce( ( total, {num, price}) => total+(num*price), 0));
        }
    }, [])
    useEffect( () => {
        (total < 0) && setTotal(0);
    },[total])
    return {cart, setCart, total, setTotal};
}