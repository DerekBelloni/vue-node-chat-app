import { api } from './Api';

class UploadsService {
    async getProfilePic(fileName) {
        try {
            const profilePic = await api.get(`/upload/${fileName}`, { responseType: 'arraybuffer' }).catch(error => {
                console.error("API call failed: ", error);
            });
            // look into changing this from btoa to 'Buffer.from(str, base64)'
            const base64Image = btoa(String.fromCharCode(...new Uint8Array(profilePic.data)));   
            const imageUrl = `data:image/jpeg;base64,${base64Image}`;
            return imageUrl;   
        } catch (error) {
            throw new Error("Error getting profile picture: ", error.message)
        }
    }
}

export const uploadsService = new UploadsService();