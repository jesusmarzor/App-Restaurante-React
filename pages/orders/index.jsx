import Head from "next/head";
import { useRouter } from "next/router";
import getObjects from "services/getObjects"
import {ButtonBack} from "components/ButtonBack";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthConsumer } from "contexts/AuthContext";
import { getCookie } from "cookies-next";
import { Price } from "components/Price";

import {Elements} from '@stripe/react-stripe-js';
import { CheckoutForm } from "components/CheckoutForm";
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

export default function OrdersList({orders}) {
  const router = useRouter();
  const {user:authUser} = AuthConsumer();
  const [ordersList, setOrdersList] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect( () => {
    const key = getCookie('reservationKey');
    if(key){
        setOrdersList(orders.filter( ({reservation}) => reservation.key === key.toUpperCase()) || []);
        setAmount((orders.filter( ({reservation}) => reservation.key === key.toUpperCase())).reduce((acumulator, order) => (!order.paid) ? acumulator += order.menu.price : acumulator,0))
    }else{
        (authUser) && setOrdersList(orders);
    }
  },[])
  
  return (
        <>
        <Head>
            <title>Puro gourmet | Lista de pedidos</title>
        </Head>
        <ButtonBack/>
        <h1 className="font-cookie text-center font-bold text-5xl">Lista de pedidos</h1>
        <div className="flex flex-col my-5">
            <header className="w-full flex justify-between items-center text-center py-2 font-bold bg-slate-200 rounded-lg">
            <p className="w-1/4 text-center p-2">Mesas</p>
            <p className="w-1/4 text-center p-2">Pedido</p>
            <p className="w-1/4 text-center p-2">Nota</p>
            <p className="w-1/4 text-center p-2">Estado</p>
            </header>
            {
            (ordersList.length !== 0)
            ?
            ordersList.map( ({id, menu, reservation, note, number, tracking, paid})=> {
                return(
                    <Link key={id} href={`/orders/${id}`}>
                        <a className="flex justify-between hover:bg-slate-200 items-center my-1 py-3 rounded">
                            <p className="w-1/4 truncate text-center px-1">{
                                reservation.tables.map( ( table, index ) => {
                                    return (index === (reservation.tables.length-1)) ? table.number : table.number + ', ';
                                })
                            }</p>
                            <p className="w-1/4 truncate text-center px-1">{menu.name} x {number}</p>
                            <p className="w-1/4 truncate text-center px-1">{(note) ? "Si" : "No"}</p>
                            <p className="w-1/4 truncate text-center px-1">{(paid && tracking === 'Completado') ? "Pagado" : tracking}</p>
                        </a>
                    </Link>
                    
                    
                )
            })
            :
            <p className="text-center my-5">No hay pedidos</p>
            }
        </div>
        {(ordersList.length > 0 && !authUser)
        &&
        <div className="border-t-2 pt-5">
            {
            (amount === 0)
            ?
            <p className="text-right mb-5 mr-5 font-bold">Todo pagado</p>
            :
            <>
                <p className="text-right mb-5 mr-5 font-bold">Total <Price price={amount}/></p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm amount={amount} ordersList={ordersList}/>
                </Elements>
            </>
            }
        </div>
        }
        
    </>
  )
}

export async function getServerSideProps ({req}) {
    const token = req.cookies.auth_token;
    const orders = await getObjects('order', token);
    return {
        props: {
            orders
        }
    }
}
