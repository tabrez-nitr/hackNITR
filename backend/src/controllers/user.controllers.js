import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";


const generateRefreshAccessToken = async(userId) => {
      try {
        const user = await User.findById(userId);
        if(!user){
            throw new apiError(500,"User not fount")
        }
       const accessToken = await user.generateAccessToken();
       const refreshToken = await user.generateRefreshToken();

       user.refreshToken = refreshToken
       await user.save({validateBeforeSave:false})
       return {refreshToken,accessToken}

      } catch (error) {
        throw new apiError(500,"Something went wrong")
      }
}

const registerUser = asyncHandler(async(req,res) => {
    //console.log(req.body)
    const {username,email,password} = req.body;

    if(!username){
        throw new apiError(400,"Username is required")
    }
    if(!email){
        throw new apiError(401,"Email is required");
    }
    if(!password){
        throw new apiError(402,"Password is required")
    }
    
    if(!(email === email.toLowerCase()) || !email.includes("@")){
        throw new apiError(403,"Invalid email..")
    }


    const sameemailexist = await User.findOne({email});

    if(sameemailexist){
        throw new apiError(403,"Email already registered");
    }
    

    const profilePath = req?.file?.path;
    //console.log(profilePath)
    const profile = await uploadOnCloudinary(profilePath);
    //console.log(profile)
    const user = await User.create({
        username: username,
        email: email,
        password: password,
        profile: profile?.url || "",
        profile_id: profile?.public_id || ""
    });

    
    const ispresent = await User.findById(user?._id).select("-password -refreshToken")

    if(!ispresent){
        throw new apiError(500,"Opps !!!! Registration failed....Try again")
    }
    const {refreshToken , accessToken} = await generateRefreshAccessToken(user._id)
     
   // console.log(ispresent);
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
     .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(200,ispresent,"registration Successfully...")
    )

})



export {registerUser}

