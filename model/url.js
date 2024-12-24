import { Schema, model } from 'mongoose';


const urlSchema=new Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitedHistory:[{timestamp:{
        type:Number,
    }}],

},{
    timestamps:true,
});

const URL=model('url',urlSchema);

export default URL;