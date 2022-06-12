import Link from "next/link";
import {Spinner} from "../components/Spinner";
export function Button({loading = false, href = null, backgroundColor="bg-lime-600", onclick = null, type = null, width = 'w-20', children}){
    return(
        (href)
        ?
        <Link href={href}><a className={`px-3 py-2 ${backgroundColor} rounded-xl text-white`}>{children}</a></Link>
        
        :
        <button className={`relative overflow-hidden ${backgroundColor} p-2 rounded-xl h-10 ${width} text-white`} onClick={onclick} type={type}>{(loading) ? <Spinner/> : children}</button>
    )
}