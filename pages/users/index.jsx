import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {useModal} from "hooks/useModal";
import getObjects from "services/getObjects"
import {AuthConsumer} from "contexts/AuthContext";
import {ButtonBack} from "components/ButtonBack";
import { Button } from "components/Button";
import { Modal } from "components/Modal";

export default function UsersList({users}) {
  const {user} = AuthConsumer();
  const router = useRouter();
  const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
  
  return (
    <>
      <Head>
          <title>CRUD | Usuarios</title>
      </Head>
      <ButtonBack/>
      <div className="flex flex-col">
        <header className="w-full flex justify-between items-center text-center py-2 font-bold bg-slate-200 rounded-lg">
          <p className="w-2/6">Imagen</p>
          <p className="w-2/6">Rol</p>
          <p className="w-2/6">Nombre</p>
        </header>
        {
          (users.length !== 0)
          ?
            users.map( ({id, image, name, email, role}) => {
              return( 
                <Link key={id} href={`/users/${id}`}>
                  <a className="w-full flex justify-between items-center text-center  cursor-pointer hover:bg-slate-200 my-2 overflow-hidden rounded-lg">
                    <div className="w-2/6 flex items-center justify-center">
                      <Image src={process.env.NEXT_PUBLIC_URL + image} alt={`Imagen del perfil de ${name}`} width={100} height={100} objectFit="cover"/>
                    </div>
                    <p className="w-2/6">{role}</p>
                    <p className="w-2/6">{name}</p>
                  </a>
                </Link>
              )
            })
          :
            <p className="text-center">No hay usuarios registrados</p>
        }
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <Button href="/register" backgroundColor="bg-green-600">Crear Usuario</Button>
      </div>
      {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
    </>
  )
}

export async function getServerSideProps ({req}) {
  const token = req.cookies.auth_token;
  const users = await getObjects('user', token);
  return {
    props: {
      users
    }
  }
}
