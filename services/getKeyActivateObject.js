export default async function getObjects(model, id, token = null){
    const key = await fetch( process.env.NEXT_PUBLIC_URL_API + model + '/activate/key/' + id,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`   
        }
    })
    .then( response => response.json())
    .then( ({key}) => key);
    return key;
}