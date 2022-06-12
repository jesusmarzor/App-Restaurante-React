import Image from "next/image";
import { Button } from "components/Button";
import { FormElement } from "components/FormElement";
import { AuthConsumer } from "contexts/AuthContext";

export function FormUser({action, user = null, handleSubmit, setName, setEmail, setImage, setRole, setPassword, deleteUser, errors, loading}){
    const {user: authUser} = AuthConsumer();
    
    const changeName = (e) => {
        setName(e.target.value);
    }
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changeImage = (e) => {
        setImage(e.target.files[0]);
    }
    const changeRole = (e) => {
        setRole(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    
    return(
        <div className="max-w-xl mx-auto">
            <h1 className="text-center font-bold text-2xl">{action} usuario</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center" method="post" encType="multipart/form-data">
                {(action !== "crear" && user) && <div className="m-5"><Image className="" src={process.env.NEXT_PUBLIC_URL + user.image} width={150} height={150} objectFit="contain"/></div>}
                {(action === "crear") && <FormElement label="Imagen" id="image" type="file" accept=".png, .jpg, .jpeg" errors={(errors) && errors.image} handleChange={changeImage}/>}
                <FormElement label="Nombre" id="name" type="text" errors={(errors) && errors.name} handleChange={changeName} value={(user) && user.name} disabled={(action === "ver") ? true : false}/>
                <FormElement label="Email" id="email" type="email" errors={(errors) && errors.email} handleChange={changeEmail} value={(user) && user.email} disabled={(action === "ver") ? true : false}/>
                {(action !== "ver") && <FormElement label="Contraseña" id="password" type="password" errors={(errors) && errors.password} handleChange={changePassword}/>}
                <FormElement label="Rol" id="role" type="select" options={['camarero', 'cocinero', 'admin']} errors={(errors) && errors.role} handleChange={changeRole} disabled={((authUser && authUser.role !== "admin") || action === "ver") ? true : false} value={(user) && user.role}/>
                
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
                        {
                            (authUser && authUser.role === 'admin') &&
                                <Button onclick={() => deleteUser(user.id)} backgroundColor="bg-red-500">Borrar</Button>
                        }
                    </div>
                }
        </div>
    )
}