export async function checkout(data){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + "checkout", {
        method: 'POST',headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then( response => response.json())
    .then( data => data);
}