export default async function deleteImage(image, token = null){
    const data = { image }
    return await fetch( process.env.NEXT_PUBLIC_URL_API + 'image/delete', {
        method: "post",
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