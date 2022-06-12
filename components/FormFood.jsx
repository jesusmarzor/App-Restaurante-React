import Image from "next/image";
import { Button } from "components/Button";
import { FormElement } from "components/FormElement";
import { AuthConsumer } from "contexts/AuthContext";
import { allAllergens, allSectionsMenu } from "assets/constants";

export function FormFood({action, food = null, handleSubmit, setName, setDescription, setPrice, setImage, setAllergens, setType, errors, loading}){
    const {user: authUser} = AuthConsumer();
    
    const changeName = (e) => {
        setName(e.target.value);
    }
    const changeDescription = (e) => {
        setDescription(e.target.value);
    }
    const changePrice = (e) => {
        setPrice(e.target.value);
    }
    const changeImage = (e) => {
        setImage(e.target.files[0]);
    }
    const changeAllergens = (e) => {
        setAllergens(e.target.value);
        
    }
    const changeType = (e) => {
        setType(e.target.value);
    }
    
    return(
        <div className="max-w-xl mx-auto">
            <h1 className="text-center font-bold text-2xl">{action} plato</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center" method="post" encType="multipart/form-data">
                {(action !== "crear" && food) && <div className="m-5"><Image className="" src={process.env.NEXT_PUBLIC_URL + food.image} width={150} height={150} objectFit="contain"/></div>}
                {(action === "crear") && <FormElement label="Imagen" id="image" type="file" accept=".png, .jpg, .jpeg" errors={(errors) && errors.image} handleChange={changeImage}/>}
                <FormElement label="Nombre" id="name" type="text" errors={(errors) && errors.name} handleChange={changeName} value={(food) && food.name} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Descripción" id="description" type="textarea" errors={(errors) && errors.description} handleChange={changeDescription} value={(food) && food.description} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Pecio" id="price" type="number" errors={(errors) && errors.price} handleChange={changePrice} value={(food) && food.price} min={0} step={0.1} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Alérgenos" id="allergens" options={allAllergens} type="checkbox" errors={(errors) && errors.price} handleChange={changeAllergens} value={(food) && food.allergens} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Tipo" id="type" type="select" options={allSectionsMenu} errors={(errors) && errors.type} handleChange={changeType} disabled={(action === "ver") ? true : false} value={(food) && food.type}/>
                {
                    
                    (action !== "ver") && 
                    <div className="flex items-center justify-around w-full mt-5">
                        <Button type="submit" loading={loading} backgroundColor="bg-lime-600">Aceptar</Button>
                    </div>
                }
            </form>
            
                {
                    (action === "ver") && 
                    <div className="flex items-center justify-around w-full mt-5">
                        <Button href={`/users/edit/${user.id}`} backgroundColor="bg-cyan-500">Editar</Button>
                        <Button onclick={() => deleteUser(user.id)} backgroundColor="bg-red-500">Borrar</Button>
                    </div>
                }
        </div>
    )
}