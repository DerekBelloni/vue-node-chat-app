import { profilesService } from "../services/ProfilesService.js";
export class ProfilesController {
    static async uploadProfilePic(req, res) {
        try {
            await profilesService.uploadProfilePic(req);
        } catch (error) {
            console.log("error: ", error);
        }
    }
}

export default ProfilesController;