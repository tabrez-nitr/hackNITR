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

const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;

    if(!email){
        throw new apiError(400,"Email is required...")
    }
    if(!password){
        throw new apiError(401,"password is required...");
    }
    if(!(email === email.toLowerCase()) || !email.includes("@")){
       throw new apiError(403,"Invalid email..")
   }


   //console.log(email);
    const user = await User.findOne({email:email});
    //console.log(user);
    //const users = await User.find({});
    //console.log("TOTAL USERS:", users.length);

    
    if(!user){
        throw new apiError(403,"User not found...")
    }


    const validPassword = user.isPasswordCorrect(password);

    if(!validPassword){
        throw new apiError(405,"Password is incorrect..");
    }
    

    const {refreshToken , accessToken} = await generateRefreshAccessToken(user._id)


    const options = {
        httpOnly: true,
        secure: true
    }

    const newuser = await User.findById(user._id).select("-password -refreshToken")
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(200,{
            User : newuser,refreshToken,accessToken
        },"Login successfully....")
    )

})

const logoutUser = asyncHandler(async(req,res) => {
      await User.findByIdAndUpdate(
        req.user._id,
        {
           $unset: {
             refreshToken: 1
           }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new apiResponse(200,{},"You logout....")
    )
})

const changeCurrentPassword = asyncHandler(async(req,res) => {
    const {oldPassword,newPassword,confirmPassword} = req.body;
    if(!oldPassword){
        throw new apiError(400,"Old Password is required..");
    }
    if(!newPassword){
        throw new apiError(401,"New Password is required..");
    }
    if(!confirmPassword){
        throw new apiError(403,"Confirm Password is equired..");
    }
    if(oldPassword==newPassword){
        throw new apiError(405,"Old Password and New Password should not be equal...")
    }
    if(newPassword != confirmPassword){
        throw new apiError(406,"New password and Confirm password should be equal..");
    }


    const user = await User.findById(req?.user?._id);
    if(!user){
        throw new apiError(407,"User not found");
    }

    const validation = await user.isPasswordCorrect(oldPassword);

    if(!validation){
        throw new apiError("Password is incorrect..");
    }

    user.password = newPassword
    await user.save();

    return res.status(200).json(
        new apiResponse(200,{},"Password changed successfully...")
    )

})

const changeProfile = asyncHandler(async(req,res) => {
    const newProfilePath = req?.file?.path;

    if(!newProfilePath){
        throw new apiError(400,"New Profile Picture is required...")
    }

    const newprofile = await uploadOnCloudinary(newProfilePath);
    if(!newprofile){
        throw new apiError(500,"problem in uploading profile...")
    }

    const user = await User.findById(req?.user?._id);
    if(!user){
        throw new apiError(500,"user not found..");
    }

    if(user.profile_id){
        await deleteFromCloudinary(user.profile_id);
    }

    user.profile_id = newprofile.public_id;
    user.profile = newprofile.url;
    await user.save();

    return res.status(200).json(
        new apiResponse(200,{},"profile changed Successfully..")
    )
})


export {registerUser,loginUser,logoutUser,changeCurrentPassword,changeProfile}

