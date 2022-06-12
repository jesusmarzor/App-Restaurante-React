import uploadImage from "./uploadImage";
import uploadObject from "./uploadObject";
export default async function uploadObjectWithImage(path, image, model, data){
    return await uploadImage(path, image)
        .then( async (image) => {
            data.image = image;
            const status =  await uploadObject(model, data)
            .then( status => status)
            return status;
        })
}