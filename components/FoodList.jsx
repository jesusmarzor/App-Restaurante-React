import { Food } from "components/Food";

export function FoodList({title, menu}){
    return(
        (menu.length !== 0)
        ?
            <>
                <h2 className="font-cookie py-2 my-2 border-b-2 border-slate-100 font-bold text-3xl">{title}</h2>
                {
                    menu.map( ({id, name, price, image, description, allergens, score}) => {
                        return( 
                            <Food
                                key={id+name}
                                id={id}
                                name={name}
                                price={price}
                                image={image}
                                description={description}
                                allergens={allergens}
                                score={score}
                            />
                        )
                    })
                }
            </>
        :   
            <>
                <h2 className="font-cookie py-2 my-2 border-b-2 border-slate-100 font-bold text-3xl">{title}</h2>
                <p className="text-center my-5">No hay {title.toLowerCase()} registrados</p>
            </>
    )
}