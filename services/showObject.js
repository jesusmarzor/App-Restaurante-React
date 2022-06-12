export default async function showObject( model, id, token = null ){
    const object = await fetch( process.env.NEXT_PUBLIC_URL_API + model + '/' + id , {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`   
        }
    })
    .then( response => response.json())
    .then( data => data);
    return object;
}