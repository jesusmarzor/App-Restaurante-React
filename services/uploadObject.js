export default async function uploadObject(model, data, token=null){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + model, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then( response => response.json())
    .then( data => data);
}