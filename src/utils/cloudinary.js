import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadToCloudinary = async (localfilepath) => {
    try {
        if(!localfilepath) return null;
        const response = cloudinary.uploader.upload(localfilepath,{
            resource_type: "auto"
        })
        console.log("file is uploaded to cloudinary", response.url);
        return response;
    }
        catch (error) {
            fs.unlinkSync(localfilepath);  //remove the locally saved temporary file as the upload operation failed
            console.error("Cloudinary upload error:", error);
            return null;
        }

}


export {uploadToCloudinary};
