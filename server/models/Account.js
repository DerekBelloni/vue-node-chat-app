import mongoose from 'mongoose'
const { Schema}  = mongoose;

export const AccountSchema = new Schema({
    username: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
})
