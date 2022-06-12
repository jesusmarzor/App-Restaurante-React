import { FoodCart } from "components/FoodCart";

export function CartList({cart, deleteFoodCart}){
    return(
        (cart.length !== 0)
        ?
            cart.map( ({id,idFood, name, price, note, num}) => {
                return( 
                    <FoodCart
                        key={id}
                        id={id}
                        idFood={idFood}
                        name={name}
                        price={price}
                        note={note}
                        num={num}
                        deleteFoodCart={deleteFoodCart}
                    />
                )
            })
        :   
            <p className="text-center my-5">Vacío</p>
    )
}