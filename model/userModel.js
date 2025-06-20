import { Schema } from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import generator from "generate-password"
import sendMail from "../services/sendMail.js";
import mongoose from "mongoose"
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userScheme = new Schema({
    fullName: {
        type: String,
        required: [true, "FullName is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    tempPassword: {
        type: String,
        default: null
    }
}, { timestamps: true });

userScheme.statics.registerAccount = async function (data) {
    if (!validator.isEmail(data.email)) {
        throw Error('Must be a Valid Email')
    }
    if (data.password !== data.confirmPassword) {
        throw Error(' Password and Confirm pasword must match');
    }
    if (!validator.isStrongPassword(data.password)) {
        throw Error("Password must consist of at least one uppercase, one lowercase, one number and one symbol ")
    }


    const emailExist = await this.findOne({ email: data.email });
    if (emailExist) {
        throw Error("Email aready exist")
    }


    const phoneNumberExist = await this.findOne({ phoneNumber: data.phoneNumber });
    if (phoneNumberExist) {
        throw Error("Phone number already exist")
    }

    const gensalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, gensalt);
    data.password = hash;
    const user = await this.create(data);
    return await this.findOne({ username: data.username }).select('-password');
}

userScheme.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All feilds are required");
    }
    const exist = await this.findOne({ email });
    if (!exist) {
        throw Error("Invalid Login Credentials");
    }

    const compare = await bcrypt.compare(password, exist.password);
    if (!compare) {
        throw Error("Invalid Login Credentials");
    }
    return await this.findOne({ email }).select('-password');
}

userScheme.statics.getUser = async function (id) {
    const user = await this.findById(id).select('-password');
    if (!user) {
        throw Error('Invalid Id')
    }
    return user;
}

userScheme.statics.getUserByEmail = async function (emails) {
    const exist = await this.findOne({ email: emails }).select('-password');
    if (!exist) {
        throw Error('Invalid Email')
    };
    return exist;
}

userScheme.statics.forgotPassword = async function (emails, url) {
    const existEmail = await this.findOne({ email: emails });
    if (!existEmail) {
        throw Error(`email ${emails} does not exist`);
    }
    const tempPasswords = generator.generate({
        length: 10,
        numbers: true
    });


    const gensalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(tempPasswords, gensalt);
    url += `/${existEmail._id}`;
    try {
        const token = await jwt.sign({ tempPasswords }, process.env.SECRET, { expiresIn: '1h' });
        url += `?token=${token}`;
        const updatePassword = await this.findByIdAndUpdate(existEmail._id, { tempPassword: hash });
        return await sendMail(emails, url, existEmail.fullName, tempPasswords, 
            path.join(__dirname, '../veiw/forgotPassword.ejs'));
    }
    catch (error) {
        throw Error(error)
    };

}

userScheme.statics.changePassword = async function(datas,id,token){
    const exist = await this.findById(id);
    if(!exist){
        throw Error('Invalid Account');
    } 
    console.log('exist', exist)
const compare = await bcrypt.compare(datas.oldPassword, exist.tempPassword); 
if(!compare){
    throw Error("Invalid Password");
} 
 const {tempPasswords}   = await jwt.verify(token,process.env.SECRET);
 if(!tempPasswords){
    throw Error('Session Expire,Please request for password again')
 }
 if(datas.newPassword !== datas.confirmPassword){
    throw Error('New Password and Confirm Password does not match');
 } 
 if(!validator.isStrongPassword(datas.newPassword)){
    throw Error("Password must consist of at least one uppercase, one lowercase, one number and one symbol ")
}
 const gensalt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(datas.newPassword,gensalt);
 return await this.findByIdAndUpdate(id,{tempPassword: null, password: hash});
}

userScheme.statics.deleteUserAccount = async function(id){
    const exist = this.findById(id);
    if(!exist){
        throw Error("Account not exist");
    }
    const deleteAccount = await this.findOneAndDelete({_id: id});
    return deleteAccount;
}

export default  mongoose.model('Evoting User Information', userScheme); 
