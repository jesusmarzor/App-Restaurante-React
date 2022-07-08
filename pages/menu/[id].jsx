import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import { getCookie } from "cookies-next";
import showObject from "services/showObject";
import getObjects from "services/getObjects";
import deleteObjectWithImage from "services/deleteObjectWithImage";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";
import { ButtonBack } from "components/ButtonBack";
import { AuthConsumer } from "contexts/AuthContext";
import {Price} from "components/Price";
import { Button } from "components/Button";
import {Counter} from "components/Counter";
import { FormElement } from "components/FormElement";
import Allergen from "components/Allergen";
import { opinionPoints } from "assets/constants";
import uploadObject from "services/uploadObject";
import deleteObject from "services/deleteObject";

export default function ElementMenu({id, name, description, price, image, allergens, type, opinions}){
    const {user: authUser} = AuthConsumer();
    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState('');
    const router = useRouter();
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [counter, setCounter] = useState(1);
    const [errors, setErrors] = useState({});

    useEffect( () => {
        if(!id){
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setRoute("/");
        }  
    },[])

    // Opinion

    const [opinionName, setOpinionName] = useState("");
    const [opinion, setOpinion] = useState(null);
    const [points, setPoints] = useState(1);

    const deleteFood = (id) => {
        const token = getCookie('auth_token');
        deleteObjectWithImage('menu', id, token)
        .then( ({response, message, error_list}) => {
            setModal(true);
            setSuccessModal(response)
            setTextModal(message);
            setErrors(error_list)
            (response) && setRoute("/menu");
        })
    }

    const changeNote = (e) => {
        setNote(e.target.value);
    }

    const changeOpinionName = (e) => {
        setOpinionName(e.target.value);
    }
    
    const changeOpinion = (e) => {
        setOpinion(e.target.value);
    }

    const changePoints = (e) => {
        setPoints(e.target.value);
    }

    const saveFood = (e) => {
        e.preventDefault();
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let newFood = {idFood: id, name, price, note, num: counter};
        cart.push({id: cart.length,...newFood});
        localStorage.setItem('cart', JSON.stringify(cart));
        setModal(true);
        setSuccessModal(true)
        setTextModal("Se ha añadido " + counter + " " + name + " al carrito");
        e.target.reset();
    }

    const saveOpinion = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: opinionName,
            opinion,
            points,
            menu_id: id
        }
        uploadObject('opinion', data)
        .then( ({response, message, error_list}) => {
            setErrors(error_list);
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            setLoading(false);
            if(response){
                e.target.reset();
                setPoints(1);
                setOpinionName("");
                setOpinion(null);
                setRoute(`/menu/${id}`);
            }
        })
    }

    const deleteOpinion = (idOpinion) => {
        const token = getCookie('auth_token');
        deleteObject('opinion', idOpinion, token)
        .then( ({response, message}) => {
            setModal(true);
            setSuccessModal(response)
            setTextModal(message);
            (response) && setRoute("/menu/" + id);
        })
    }

    return(
        <>
            <Head><title>CRUD | {name}</title></Head>
            {
                (id) &&
                <>
                <ButtonBack/>
                <div className="relative mt-5 h-36 flex justify-center items-center overflow-hidden rounded-sm">
                    <Image src={ process.env.NEXT_PUBLIC_URL + image} alt={`Imagen de ${name}`} layout="fill" objectFit="cover" priority={true}/>
                </div>
                <h1 className="text-2xl font-bold my-5">{name}</h1>
                <p className="my-2">{description}</p>
                {JSON.parse(allergens).map( name => <Allergen key={name} allergen={name}/>)}
                {
                    (authUser)
                    ?
                        (authUser.role === 'admin') &&
                        <div className="flex items-center justify-around w-full mt-5">
                            <Button href={`/menu/edit/${id}`} backgroundColor="bg-cyan-500">Editar</Button>
                            <Button onclick={() => deleteFood(id)} backgroundColor="bg-red-500">Borrar</Button>
                        </div>
                        
                    :
                        <form onSubmit={saveFood} className="my-5">
                            <FormElement handleChange={changeNote} label="Dejar una nota a cocina" id="note" type="textarea" full={true}/>
                            <Counter
                                counter={counter}
                                setCounter={setCounter}
                            />
                            <Button type="submit" width="w-full">Añadir {counter} al carrito - <Price price={counter*price}/></Button>
                        </form>
                }
                <div className="w-full">
                    <h2 className="text-xl font-bold my-5">Comentarios</h2>
                    {
                        (opinions.length > 0)
                        ?
                            <ul>
                            {
                                opinions.map( ({id, name, opinion, points}) => {
                                    let arrayPoints = [];
                                    for(let i = 1; i <= 5; i++){
                                        let star = (i <= points) ? "full" : "empty";
                                        arrayPoints.push(star)

                                    }
                                    
                                    return(
                                        <li key={id + name}>
                                            <p className="font-bold">{name}</p>
                                            {
                                                arrayPoints.map( (star) => {
                                                    return (
                                                        <Image
                                                            key={star}
                                                            src={`/img/star/${star}.png`}
                                                            width={15}
                                                            height={15}
                                                            objectFit="contain"
                                                        /> 
                                                    )
                                                })
                                            }
                                            <p>{opinion}</p>
                                            {(authUser && authUser.role === "admin") && <button onClick={() => deleteOpinion(id)} className="text-red-500">Eliminar</button>}
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        :
                            <p className="text-center">No hay comentarios registrados</p>
                    }
                </div>
                <form onSubmit={saveOpinion} className="my-10">
                    <h2 className="text-xl font-bold my-5">Añade tu comentario</h2>
                    <FormElement handleChange={changeOpinionName} value={opinionName} label="Nombre" type="text" id="name" errors={errors && errors.name} full={true}/>
                    <FormElement handleChange={changeOpinion} value={opinion} type="textarea" label="Comentario" errors={errors && errors.opinion} full={true}/>
                    <FormElement type="select" handleChange={changePoints} options={opinionPoints} label="Puntuación" errors={errors && errors.points} full={true}/>
                    <Button type="submit" loading={loading} width={"w-full"}>Comentar</Button>
                </form>
                {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
                </>
            }
        </>
    )
}

// export async function getStaticPaths(){
//     const menu = await getObjects('menu');
//     const paths = menu.map( ({id}) => {
//         return {
//             params: {
//                 id: (id+"")
//             }
//         }
//     });
//     return {
//         paths,
//         fallback: false
//     }
// }
// export async function getStaticProps({params}){
//     let { food } = await showObject('menu', params.id);
//     return {
//         props: food
//     }
// }

export async function getServerSideProps({params}){
    let { food } = await showObject('menu', params.id);
    return {
        props: food
    }
}