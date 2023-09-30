import path from 'path';
import { promises as fs } from 'fs';

class UploadsService {
    async getProfilePic(filename) {
        const filePath = path.resolve(process.cwd(), 'uploads', filename);
        try {
            const image = await fs.readFile(filePath);
            return image;
        } catch (error) {
            throw new Error(`Error reading the file: ${error.message}`);
        }
    }
}
export const uploadsService = new UploadsService();