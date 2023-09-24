class ProfilesService {
    async uploadProfilePic (req) {
        console.log('id: ', req.params.accountID);
        console.log('file, service layer: ', req.file);
    }
}

export const profilesService = new ProfilesService();