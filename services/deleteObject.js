export default async function deleteObject(model, id, token){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + model + '/' + id,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`   
      }
    })
    .then( response => response.json())
    .then( data => data);
}