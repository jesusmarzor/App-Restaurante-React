import Link from "next/link";
import Image from "next/image";
import Allergen from "./Allergen";
import { Price } from "./Price";

export function Food({id, name, price, image, description, allergens, score}){
    return(
        <Link href={`/menu/${id}`}>
            <a className="relative w-full flex justify-between cursor-pointer hover:bg-slate-200 my-2 rounded-xl">
                <div className="w-7/12 xs:w-9/12 m-3">
                    <p className="text-light font-bold">{name}</p>
                    <p className="text-xl font-bold"><Price price={price}/></p>
                    <p className="truncate my-1">{description}</p>
                    {JSON.parse(allergens).map( name => <Allergen key={name} allergen={name}/>)}
                    { (score !== 0) && <p className={`absolute -bottom-2 -right-2 z-10 flex justify-center items-center text-xl rounded-full w-12 h-12 p-2 text-white ${(score < 3) && 'bg-red-500'} ${(score === 3) && 'bg-orange-500'} ${(score > 3) && 'bg-green-500'}`}>{score}</p> }
                </div>
                <div className="w-5/12 xs:w-3/12 flex justify-center rounded-tr-xl rounded-br-xl overflow-hidden">
                    <Image src={ process.env.NEXT_PUBLIC_URL + image} alt={`Imagen del perfil de ${name}`} width={200} height={200} objectFit="cover"/>
                </div>
            </a>
        </Link>
    )
}