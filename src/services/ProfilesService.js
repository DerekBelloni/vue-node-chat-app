import { api } from './Api';

class ProfilesService {
    async uploadProfilePic(accountID, formData) {
        console.log('in client service layer: ', accountID, formData);
        try {
            const res = await api.post(`/profile/${accountID}`, formData);
            return res.data
        } catch (error) {
            throw new Error('Failed to upload profile picture');
        }
    }
}

export const profilesService = new ProfilesService();