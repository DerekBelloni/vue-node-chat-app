import { api } from './Api';

class ProfilesService {
    async uploadProfilePic(accountID, formData) {
        try {
            const res = await api.post(`/profile/${accountID}`, formData);
            return res.data
        } catch (error) {
            console.log('Failed to upload profile picture: ', error);
        }
    }

    async replaceProfilePic(accountID, formData) {
        try {
            const res = await api.post(`/profile/replace/${accountID}`, formData);
            return res.data;
        } catch (error) {
            console.log('Failed to upload replacement profile picture', error);
        }
    }
 }

export const profilesService = new ProfilesService();