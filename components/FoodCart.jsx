import Link from "next/link";
import { Price } from "./Price";

export function FoodCart({id, idFood, name, price, note, num, deleteFoodCart}){
    return(
        <div className="flex flex-col">
            <Link href={`/menu/${idFood}`}>
                <a className="w-full p-5 flex justify-between items-center cursor-pointer hover:bg-slate-200 my-2 overflow-hidden rounded-xl">
                    <p className="w-5/12 text-left text-light truncate">{name}</p>
                    <p className="w-5/12 text-center">{num} x <Price price={price}/></p>
                    <p className="w-2/12 text-right"><Price price={price*num}/></p>
                </a>
            </Link>
            <button onClick={() => deleteFoodCart(id)} className="flex justify-center items-center ml-5 text-red-600 font-bold w-20 hover:underline">Eliminar</button>
        </div>
    )
}