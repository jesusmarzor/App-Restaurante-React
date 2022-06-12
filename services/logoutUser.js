
export default async function logoutUser(user){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + 'logout', {
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