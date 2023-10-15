const mongoose = require('mongoose');
const {isEmail} = require('validator');

//Generación de schema
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [isEmail, 'Invalid email']
    },
    bio: {
        type: String,
        maxlength: 200,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    avatar: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            //delete ret.password;
            return ret;
        }
    }
});

//Generación de modelo
const User = mongoose.model("User", schema);

module.exports = User;