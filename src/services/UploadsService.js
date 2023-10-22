import { api } from './Api';

class UploadsService {
    async getProfilePic(fileName) {
        try {
            const profilePic = await api.get(`/upload/${fileName}`, { responseType: 'arraybuffer' });
            if (!profilePic.data || !(profilePic.data instanceof ArrayBuffer)) {
                throw new Error("Unexpected response format from API");
            }
            // Convert ArrayBuffer to base64 using a Blob and FileReader
            return new Promise((resolve, reject) => {
                const blob = new Blob([profilePic.data], { type: 'image/jpeg' }); // Assuming JPEG format
                const reader = new FileReader();
        
                reader.onloadend = function() {
                    const base64data = reader.result;
                        resolve(base64data);
                    };
        
                    reader.onerror = function(error) {
                        reject(new Error("Failed to convert image to base64: ", error.message));
                    };
        
                    reader.readAsDataURL(blob);
            });
        
        } catch (error) {
            console.error("Error getting profile picture: ", error.message);
        }
    }
}

export const uploadsService = new UploadsService();