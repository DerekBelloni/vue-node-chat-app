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
        // eventually two phase commit
        const imageToReplace = await dbContext.Image.findOneAndDelete({
            accountID: req.params.accountID
        })
        if (!imageToReplace) {
            // update this to best practice later
            console.log("Image could not be deleted")
        }
        const imageUpload = await dbContext.Image.create({
            accountID: req.params.accountID,
            file_name: req.file.filename
        })
        return imageUpload
    }
}

export const profilesService = new ProfilesService();