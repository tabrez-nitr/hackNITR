import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const searchSchema = new Schema({
        Heading:{
        type: String,
        required: true
    },
    Describtion: {
        type: String,
        required: true,
    }
},{timestamps:true})


searchSchema.plugin(mongooseAggregatePaginate);


export const Search = mongoose.model("Search",searchSchema); 