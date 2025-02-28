import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
        validate: [isURL, 'Invalid URL format'],
    },
    visitedHistory:[{timestamp:{
        type:Number,
    }}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users", 
    }

},{
    timestamps:true,
});

const URL=mongoose.model('url',urlSchema);

export default URL;