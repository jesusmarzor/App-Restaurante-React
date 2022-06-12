export default async function updateKeyObject(model, id, token){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + model + '/activate/' + id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            
        }
    })
    .then( response => response.json())
    .then( data => data);
}