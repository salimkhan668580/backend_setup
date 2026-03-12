import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },

    role:{
        type: String,
        enum: ['admin', 'subAdmin','staff','client'],
        default: 'staff',
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    password:{
        type: String,
        required: true,
    },
     roleId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Role"
 }
},{timestamps: true});


AdminSchema.pre('save', async function () {
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



const Admin = mongoose.model('Admin', AdminSchema);


export default Admin;