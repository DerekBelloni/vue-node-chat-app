import { profilesService } from "../services/ProfilesService.js";
export class ProfilesController {
    static async uploadProfilePic(req, res) {
        try {
            const imageUpload = await profilesService.uploadProfilePic(req);
            res.send(imageUpload);
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({ error: "An error occurred"});
        }
    }

    static async replaceProfilePic(req, res) {
        try {
            const imageUpload = await profilesService.replaceProfilePic(req);
            res.send(imageUpload);
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({ error: "An error occurred"});
        }
    }
}

export default ProfilesController;