import mongoose from 'mongoose'
const { Schema } = mongoose;

export const AccountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {type: String,
        required: true,
        unique: true},
    password: {type: String}
})
