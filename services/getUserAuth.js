export default async function getUserAuth(token){
    return await fetch( process.env.NEXT_PUBLIC_URL_API + 'auth/user',{
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then( response => response.json())
    .then( ({response, user}) => (response) ? {...user, token} : null);
}