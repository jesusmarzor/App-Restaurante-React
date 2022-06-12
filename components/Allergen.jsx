import Image from "next/image";
export default function Allergen({allergen}){
    return(    
        <Image
            src={`/img/allergens/${allergen}.png`}
            width={30}
            height={30}
            objectFit="contain"

        />
    )
}