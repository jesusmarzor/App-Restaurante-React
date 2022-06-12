export default async function putObject(model, id, data, token){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + model + '/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            
        },
        body: JSON.stringify(data)
    })
    .then( response => response.json())
    .then( data => data);
}