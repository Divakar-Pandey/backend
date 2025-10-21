import {asynchandler} from '../utils/asynchandler.js';
import { apierror}   from '../utils/apierror.js';
import { User } from '../models/user.model.js';
import { uploadtoCloudinary } from '../utils/cloudinary.js';
import { apiresponse } from '../utils/apiresponse.js';

const registerUser = asynchandler(async (req, res) => {
    
    // get user data from frontend
    // validate data
    // check if user already exists
    // check for images , avatar
    // upload to cloudinary,avatar
    // create user in db
    //remove password and refresh token from response
    // check for user creation
    //return response
    const {fullname , email ,username ,password} = req.body
    console.log("email",email)
    if(
        [fullname , email ,username ,password].some((field) => field?.trim() === "")
    )
    {
        throw new apierror("All field are required", 400);
    }

    const existeduser = user.findOne({
        $or : [{user} , {email} ]
    })

    if(existeduser){
        throw new apierror("User already exists", 409);
    }

    const avatarlocalpath = req.files ?.avatar[0]?.path;
    const coverimagelocalpath = req.files ?.coverimage[0]?.path;

    if(!avatarlocalpath){
        throw new apierror("Avatar is required", 400);
    }


    const avatar = await uploadoncloudinary(avatarlocalpath)
    const coverimage = await uploadtoCloudinary(coverimagelocalpath);

    if(!avatar){
        throw new apierror("avatar field is required", 400);
    }

    const user = user.create({
        fullname,
        avatar : avatar.url,
        coverimage : coverimage ?.url || "",
        email,
        username: username.tolowercase(),
        password
    })

    const createduser = await user.findById(user._id).select(
        "-password -refreshTokens"
    )

    if(!createduser){
        throw new apierror("Something went wrong while registering user", 500);
    }

    return res.status(201).json(
        new apiresponse(200,createduser,"User registered successfully")
    )
});

export { registerUser };