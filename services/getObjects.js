export default async function getObjects(model, token = null){
    const objects = await fetch( process.env.NEXT_PUBLIC_URL_API + model,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`   
        }
    })
    .then( response => response.json())
    .then( data => data);
    return objects;
}