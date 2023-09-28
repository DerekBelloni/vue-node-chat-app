import { dbContext } from '../db/DbContext.js';

class ProfilesService {
    async uploadProfilePic (req) {
        console.log(req.file);
        const imageUpload = await dbContext.Image.create({
            accountID: req.params.accountID,
            file_name: req.file.filename
        })
        return imageUpload;
    }
}

export const profilesService = new ProfilesService();