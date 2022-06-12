import deleteImage from "./deleteImage";
import uploadImage from "./uploadImage";
import putObject from "./putObject";

export default async function putObjectWithImage(image, path, newImage, model, id, data){
    return await deleteImage(image)
    .then( async (status) => {
        if( status === 200){
            return await uploadImage(path, newImage)
            .then( async (image) => {
                data.image = image;
                return await putObject(model, id, data)
                .then( status => status);
            })
        }
    })
}