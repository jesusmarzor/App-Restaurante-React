import { Footer } from "components/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const days = ['Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados'];
  return (
      <>
      <Head>
          <title>Puro gourmet | Inicio</title>
      </Head>
      <Link href="/login"><a className="block w-12 text-center ml-auto">Login</a></Link>
      <div className="w-full sm:w-80 mx-auto overflow-hidden">
        <Image src="/img/logo.png" alt="logo restaurante" objectFit="contain" width={500} height={500}/>
      </div>
      <p className="text">
        Anímate a pasar una agradable velada con nosotros probando nuestra comida gourmet. 
        En nuestro restaurante Puro gourmet te ofrecemos platos sabrosos y variados que, gracias a nuestro ambiente, todavía saben mejor. 
        Ven a vernos los días soleados y disfruta de nuestra terraza. 
        Huye del calor fácilmente gracias a nuestras cómodas salas climatizadas.
      </p>
      <div className="w-full overflow-hidden">
        <Image src="/img/restaurant.jpg" alt="logo restaurante" objectFit="contain" width={800} height={800}/>
      </div>
      <h2 className="font-cookie text-5xl text-center my-5">Horarios</h2>
      <div className="flex flex-col">
        {
          days.map( day => {
            return (
              <div key={day} className="flex justify-between items-center">
                <p>{day}</p>
                <p>12:00 - 00:00</p>
              </div>
            )
          })
        }
      </div>
      <div className="w-full overflow-hidden">
        <Image src="/img/restaurant2.jpg" alt="logo restaurante" objectFit="contain" width={800} height={800}/>
      </div>
      <h2 className="font-cookie text-5xl text-center my-5">Dirección</h2>
      <p className="text-center">Calle Martinez Primero 28,</p>
      <p className="text-center">28111 Madrid, España</p>
      <p className="text-center">(+__) 6_02_329_</p>
      <Footer/>
    </>
  )
}
