import deleteImage from "./deleteImage";

export default async function deleteObjectWithImage(model, id, token=null){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + model + '/' + id,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`   
      }
    })
    .then( response => response.json())
    .then( async ( result ) => {
      const {image, ...data} = result;
      return await deleteImage(image, token)
      .then( result => {
        return (result.response) ? data : result;
      })
      .catch( () => {
        return {response: false, message: "Imagen no borrada"};
      })
    })
    .catch( () => {
      return {response: false, message: "Se ha eliminado con exito"};
    })
}