import mongoose from 'mongoose'
const { Schema } = mongoose;

export const ImageSchema = new Schema({
    accountID: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    }
})