import { dbContext } from '../db/DbContext.js';

class ProfilesService {
    async uploadProfilePic(req) {
        if (req.body.fileToRemove) {
            await dbContext.Image.deleteOne({
                accountID: req.params.accountID,
                file_name: req.body.fileToRemove
            })
        }

        const imageUpload = await dbContext.Image.create({
            accountID: req.params.accountID,
            file_name: req.file.filename
        })
        return imageUpload;
    }
}

export const profilesService = new ProfilesService();