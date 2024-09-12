import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);  
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'], 
        default: 'student',  
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, 
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.ObjectId.ObjectId, ref: 'Company' },
        profile:{type:String,default:""}
        
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('User', userSchema);
export default User;
