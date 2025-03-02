import mongoose from 'mongoose';


export default async function connectToMongo(url)
{
    mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log(err));
    
}
