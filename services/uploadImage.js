export default async function uploadImage(path, image, token = null){
    var formData = new FormData();
    formData.append("path", path);
    formData.append("image", image);

    const srcImg = await fetch( process.env.NEXT_PUBLIC_URL_API + 'image/upload', {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}` 
        },
        body: formData
    })
    .then( response => response.json())
    .then( (data) => data);
    
    return srcImg;
}