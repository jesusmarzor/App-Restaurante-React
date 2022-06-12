import Head from "next/head";
import { Modal } from "components/Modal";
import { useModal } from "hooks/useModal";
import showObject from "services/showObject";
import { useState, useEffect } from "react";
import { FormElement } from "components/FormElement";
import { Button } from "components/Button";
import { getCookie } from "cookies-next";
import updateKeyObject from "services/updateKeyObject";
import { useRouter } from "next/router";
import { ButtonBack } from "components/ButtonBack";
import getObjects from "services/getObjects";
import putObject from "services/putObject";

export default function Activate({reservation, message, response, tables}) {
    const router = useRouter();
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [errors, setErrors] = useState({});
    const [tablesReservation, setTablesReservation] = useState(reservation.tables.map( ({number}) => number));
    const allTables = tables.map( ({number}) => number);
    const optionsDisabled = tables.map( ({reservation_id}) => (reservation_id === null || reservation_id === reservation.id) ? false : true);
    
    useEffect( () => {
        if(!reservation){
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setRoute("/reservation");
        }  
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(tablesReservation.length > 0 || reservation.key !== null) {

            const token = getCookie('auth_token');

            updateKeyObject('reservation', reservation.id, token)
            .then( ({response, message, error_list})  => {
                (reservation.key !== null)
                ?
                    reservation.tables.map( ({number}) => {
                        putObject('table', number, { reservation_id: null }, token);
                    })
                :
                    tablesReservation.map( table => {
                        putObject('table', table, { reservation_id: reservation.id }, token);
                    })
                setModal(true);
                setSuccessModal(response)
                setTextModal(message);
                setErrors(error_list);
                (response) && setRoute("/reservation");
            })
        }else{
            setModal(true);
            setSuccessModal(false);
            setTextModal("Una reserva activada tiene que tener mínimo una mesa");
        }
            
         
    }

    const modifyTables = () => {
        if(tablesReservation.length > 0) {
            if(reservation.key !== null) {
                const token = getCookie('auth_token');
                
                const backTablesReservation = reservation.tables.map( ({number}) => number);

                tables.map( ({id, number}) => {

                    if(!backTablesReservation.includes(number) && tablesReservation.includes(number)){
                        putObject('table', id, {reservation_id: reservation.id}, token)
                        .then( ({message, response}) => {
                            console.log(message)
                        })
                    }
                    if(backTablesReservation.includes(number) && !tablesReservation.includes(number)){
                        putObject('table', id, {reservation_id: null}, token)
                        .then( ({message, response}) => {
                            console.log(message)
                        })
                    }
                })

                setModal(true);
                setSuccessModal(true);
                setTextModal("Mesas actualizadas correctamente");
                (response) && setRoute("/reservation");
            }else{
                setModal(true);
                setSuccessModal(false);
                setTextModal("Para asignar mesas tiene que estar la reserva activa");
            }
        }else{
            setModal(true);
            setSuccessModal(false);
            setTextModal("Una reserva activada tiene que tener mínimo una mesa");
        }
    }

    const changeTables = (e) => {
        let table = parseInt(e.target.value);
        setTablesReservation( preTables => {
            return (
                (preTables.includes(table))
                ?
                    tablesReservation.filter( tbl => tbl !== table)
                :
                    [...preTables, table]
            )
        })
    }
    return(
        <>
            <Head>
                <title>Puro gourmet | Activar reserva</title>
            </Head>
            <ButtonBack/>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center" method="post">
                <FormElement label="Mesas" id="tables" options={allTables} optionsDisabled={optionsDisabled} type="checkbox" errors={(errors) && errors.tables} handleChange={changeTables} value={tablesReservation}/>
                <Button type="submit" width={"w-28"} backgroundColor={(!reservation.key) ? "bg-lime-600" : "bg-red-500"}>{(!reservation.key) ? "Activar" : "Deactivar"}</Button>
            </form>
            <div className="my-2 text-center">
                <Button onclick={modifyTables} width={"w-44"}>Modificar mesas</Button>
            </div>
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}

export async function getServerSideProps({req, params}){
    const token = req.cookies.auth_token;
    let data = await showObject('reservation', params.id, token);
    let tables = await getObjects('table', token);
    
    return {
        props: {...data, tables}
    }
}