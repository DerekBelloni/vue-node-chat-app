import { dbContext } from '../db/DbContext.js';

class ProfilesService {
    async uploadProfilePic(req) {
        const imageUpload = await dbContext.Image.create({
            accountID: req.params.accountID,
            file_name: req.file.filename
        })
        return imageUpload;
    }

    async replaceProfilePic(req) {

    }
}

export const profilesService = new ProfilesService();