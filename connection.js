import mongoose from 'mongoose';


export default async function connectToMongo(url)
{
    return mongoose.connect(url);
}
