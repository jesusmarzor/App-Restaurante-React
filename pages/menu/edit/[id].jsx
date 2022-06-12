import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getCookie } from "cookies-next";
import showObject from "services/showObject";
import putObject from "services/putObject";
import { AuthConsumer } from "contexts/AuthContext";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";
import { ButtonBack } from "components/ButtonBack";
import { FormFood } from "components/FormFood";

export default function EditMenu({food, response, message}){
    const {user: authUser, loginAuth} = AuthConsumer();
    const router = useRouter();
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [newName, setNewName] = useState((food) && food.name);
    const [newDescription, setNewDescription] = useState((food) && food.description);
    const [newPrice, setNewPrice] = useState((food && food.price));
    const [newAllergens, setNewAllergens] = useState((food) && JSON.parse(food.allergens));
    const [newType, setNewType] = useState((food) && food.type);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect( () => {
        if(!food){
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setRoute("/");
        }  
    },[])

    const changeNewAllergens = (allergen) => {
        setNewAllergens( prevNewAllergens => {
            return (
                (prevNewAllergens.includes(allergen))
                ?
                    newAllergens.filter( alrg => alrg !== allergen)
                :
                    [...prevNewAllergens, allergen]
            )
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        let data = {
            name: newName,
            description: newDescription,
            price: newPrice,
            allergens:  newAllergens,
            type: newType
        };
        const token = getCookie('auth_token');
        await putObject('menu', food.id, data, token)
        .then( async ({response, message, error_list}) => {
            setErrors(error_list);
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            setLoading(false);
            (response) && setRoute(`/menu/${food.id}`);
        })
        
    }
    return(
        <>
            <Head><title>CRUD | Editar Plato</title></Head>
            {(food) &&
                <>
                    <ButtonBack/>
                    <FormFood action="editar" food={{id: food.id, name: newName, description: newDescription, price: newPrice, image: food.image, allergens: newAllergens, type: newType}} handleSubmit={handleSubmit} setName={setNewName}  setDescription={setNewDescription} setPrice={setNewPrice} setAllergens={changeNewAllergens} setType={setNewType} errors={errors} loading={loading}/>
                </>
            }
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}


export async function getServerSideProps({req, params}){
    const token = req.cookies.auth_token;
    let data = await showObject('menu', params.id, token);
    return {
        props: data
    }
}