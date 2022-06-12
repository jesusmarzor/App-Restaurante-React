import { Button } from "components/Button";
import { ButtonBack } from "components/ButtonBack";
import { CartList } from "components/CartList";
import { FormElement } from "components/FormElement";
import { Price } from "components/Price";
import { useCart } from "hooks/useCart";
import Head from "next/head";
import { useState } from "react";
import uploadObject from "services/uploadObject";
import { Modal } from "components/Modal";
import { useModal } from "hooks/useModal";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";

export default function Cart(){
    const router = useRouter();
    const [key, setKey] = useState("");
    const {cart, setCart, total, setTotal} = useCart();
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [loading, setLoading] = useState(false);
    const changeKey = (e) => {
        setKey(e.target.value);
    }
    const orderCart = (e) => {
        e.preventDefault();
        setLoading(true);
        let cart = JSON.parse(localStorage.getItem('cart'));
        const data = {
            key: key,
            cart
        }
        uploadObject('order',data)
        .then( ({response, message}) => {
            setModal(true);
            setSuccessModal(response)
            setTextModal(message);
            if(response){
                localStorage.removeItem('cart');
                setCookies('reservationKey', key, { maxAge: 60 * 60 * 24 });
                setRoute('/menu');
            }
            setLoading(false);
        })
    }
    const deleteFoodCart = (id_food) => {
        const newCart = cart.filter( ({id, price, num}) => {
            if(id===id_food){
                setTotal( preValue => preValue - (price*num))
                return false;
            }
            return true;
        });
        if(localStorage.getItem('cart').length !== newCart.length){
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    return (
        <>
        <Head>
            <title>Puro gourmet | Carrito</title>
        </Head>
        <ButtonBack/>
        <h1 className="font-cookie text-center text-5xl font-bold my-2">Carrito de compra</h1>
        <CartList cart={cart} deleteFoodCart={deleteFoodCart}/>
        <div className="flex justify-between items-center p-5 mt-5 border-t-2 font-bold">
            <p>Total</p>
            <p className="text-xl"><Price price={total.toFixed(2)}/></p>
        </div>
        {
            (total !== 0) && 
            <form onSubmit={orderCart} className="flex flex-col justify-center items-center" method="post">
                {/* <FormElement label="Código" id="key" type="text" handleChange={changeKey} value={key}/> */}
                <input className="w-full h-10 border border-black rounded-xl pl-2 my-5" onChange={changeKey} type="text" placeholder="Código"/>
                <Button type="submit" loading={loading} width="w-full">Pedir</Button>
            </form>
        }
        {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}