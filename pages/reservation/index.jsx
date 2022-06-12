import Head from "next/head";
import { useRouter } from "next/router";
import getObjects from "services/getObjects"
import {ButtonBack} from "components/ButtonBack";
import { Button } from "components/Button";
import Link from "next/link";
import { AuthConsumer } from "contexts/AuthContext";

export default function ReservationsList({reservations}) {
    const {user:authUser} = AuthConsumer();
    const router = useRouter();
    return (
        <>
        <Head>
            <title>Puro gourmet | Lista de reservas</title>
        </Head>
        <ButtonBack/>
        <h1 className="font-cookie text-center font-bold text-5xl">Lista de reservas</h1>
        <div className="flex flex-col">
            <header className="w-full flex justify-between items-center text-center py-2 font-bold bg-slate-200 rounded-lg">
            <p className="w-1/4">F y H</p>
            <p className="w-1/4">Nombre</p>
            <p className="w-1/4">Nº</p>
            <p className="w-1/4">Código</p>
            </header>
        {
            (reservations.length !== 0)
            ?
            reservations.map( ({id, date, name, diners, key})=> {
                return(
                    <Link key={id} href={`/reservation/${id}`}>
                        <a className="flex justify-between items-center my-5">
                            <p className="text-center w-1/4">{date}</p>
                            <p className="text-center w-1/4">{name}</p>
                            <p className="text-center w-1/4">{diners}</p>
                            {(key) ? <p className="text-center w-1/4 font-bold">{key}</p> : <p className="text-center w-1/4 text-red-600">Inactiva</p>}
                        </a>
                    </Link>
                )
            })
            :
            <p className="text-center my-5">No hay reservas</p>
        }        
        </div>
        {
            (authUser && authUser.role !== 'cocinero') &&
            <div className="flex justify-center items-center">
                <Button href="/reservation/create">Crear</Button>
            </div>
        }
    </>
  )
}

export async function getServerSideProps ({req}) {
    const token = req.cookies.auth_token;
    const reservations = await getObjects('reservation', token);
    return {
        props: {
            reservations
        }
    }
}
