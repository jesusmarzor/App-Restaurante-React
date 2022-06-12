import deleteImage from "./deleteImage";
import uploadImage from "./uploadImage";

export default async function createObjectWithImage(path, image, model, data, token = null){
    return await uploadImage(path, image, token)
        .then( async ({response, message, error_list, image}) => {
            if(response){ 
                data.image = image;
            }
            return await fetch( process.env.NEXT_PUBLIC_URL_API + model, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(data)
            })
            .then( response => response.json())
            .then( async (data) => { 
                if(!data.response){
                    await deleteImage(image, token)
                    .catch( () => {
                        return {response: false, message: "Error al borrar la imagen", error_list: {}}
                    })
                }
                return {...data, error_list: {...data.error_list, ...error_list}}
            })
            .catch( (err) => {
                return {response: false, message: "Error en la creación", error_list: {}}
            })
        })
        .catch( () => {
            return {response: false, message: "Error al subir la imagen", error_list: {image: ["El archivo image no debe pesar más de 500 kilobytes."]}}
        })
}