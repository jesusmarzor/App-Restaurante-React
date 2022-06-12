
export default async function loginUser(user){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + 'login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then( response => response.json())
    .then( data => data)
}