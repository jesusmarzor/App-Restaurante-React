import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import { getCookie } from "cookies-next";
import createObjectWithImage from "services/createObjectWithImage";
import { FormFood } from "components/FormFood";
import { useModal } from "hooks/useModal";
import {Modal} from "components/Modal";
import { ButtonBack } from "components/ButtonBack";

export default function CreateFood(){
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);
    const [allergens, setAllergens] = useState([]);
    const [type, setType] = useState('entrante');
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        const token = getCookie('auth_token');
        createObjectWithImage('menu', image, 'menu', {name, description, price, allergens, type}, token)
        .then( ({response, message, error_list}) => {
            setErrors(error_list);
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            setLoading(false);
            (response) && setRoute('/menu');
        })
    }

    const changeAllergens = (allergen) =>{
        setAllergens( prevAllergens => {
            return (
                (prevAllergens.includes(allergen))
                ?
                    allergens.filter( alrg => alrg !== allergen)
                :
                    [...prevAllergens, allergen]
            )
        })
    }
    
    return(
        <>
            <Head>
                <title>CRUD | Crear Plato</title>
            </Head>
            <ButtonBack/>
            <FormFood action="crear" handleSubmit={handleSubmit} setName={setName}  setDescription={setDescription} setPrice={setPrice} setImage={setImage} setAllergens={changeAllergens} setType={setType} errors={errors} loading={loading}/>
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}