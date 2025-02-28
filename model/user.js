import {Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs';

const userSchema=new Schema({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  role:{
    type:String,
    required:true,
    enum: ['ADMIN', 'NORMAL'], 
    default:"NORMAL"
  },
  password:
  {
    type:String,
    required:true,
    minlength:6,
  }
},{timestamps:true});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
  
    const salt = await bcrypt.genSalt(10);
   
    this.password = await bcrypt.hash(this.password, salt);
  }
  next(); 
});


userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password); 
};

const User=model('user',userSchema);
export default User;