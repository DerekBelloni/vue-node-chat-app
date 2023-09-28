import mongoose from 'mongoose';
import { AccountSchema } from '../models/Account.js';
import { ImageSchema } from '../models/Upload.js';

class DbContext {
    Account = mongoose.model('Account', AccountSchema);
    Image = mongoose.model('Image', ImageSchema)
}

export const dbContext = new DbContext();