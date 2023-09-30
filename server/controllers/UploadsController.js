import { uploadsService } from "../services/UploadsService.js";

export class UploadsController {
    static async getProfilePic(req, res) {
        try {
            const filename = req.params.filename;
            const imageData = await uploadsService.getProfilePic(filename);
            
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(imageData);
        } catch (error) {
            
        }
    }
}

export default UploadsController;