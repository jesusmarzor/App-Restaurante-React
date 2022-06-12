import { useRouter } from "next/router";
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {checkout} from "services/stripe";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";
import putObject from "services/putObject";
import { Button } from "components/Button";
import { useState } from "react";
import { getCookie } from "cookies-next";

export function CheckoutForm ({amount, ordersList}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  const changeName = (e) => {
    setName(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(name !== "") {
    const {error, token} = await stripe.createToken(elements.getElement(CardElement),{
        card: { name }
    });
    if(!error){
        const {message, response, charge} = await checkout({
            amount,
            currency: "EUR",
            source: token.card.brand.toLowerCase()
        });
        if(response) {
            const key = getCookie('reservationKey');
            ordersList.map( async ({id, paid}) => (!paid) && await putObject('order', id, {paid: true, key}))
        }
        setModal(true);
        setTextModal(message);
        setSuccessModal(response);
        (response) && setRoute("/");
    }else{
        setModal(true);
        setTextModal(` ${name}, revisa la tarjeta de crédito`);
        setSuccessModal(false);
    }
    }else {
        setModal(true);
        setTextModal(` Revisa el nombre del titular de la tarjeta de crédito`);
        setSuccessModal(false);
    }
    setLoading(false);
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input onChange={changeName} className="border-2 w-full px-2 py-1 rounded-3xl focus:outline-none" placeholder="Titular de la tarjeta" type="text"/>
            <div className="my-5 border-2 p-2 rounded-3xl">
                <CardElement/>
            </div>
            <Button loading={loading} width="w-full">Pagar</Button>
        </form>
        {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
    </>
  )
};