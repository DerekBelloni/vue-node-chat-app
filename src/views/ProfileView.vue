<template>
    <div class="mt-4 ml-4">
        <a href="/"><Button class="rounded shadow bg-green-400 text-green-100 px-1">Home</Button></a>
    </div>
    <div class="grid grid-cols-12">
        <div class="grid col-span-4 ml-12">
            <div class="container mx-auto mt-16">
                <div class="card flex align-items-center justify-content-center">
                    <Card :pt="{ 
                        root: { class: 'bg-gray-50 rounded shadow-lg'},
                        header: { class: 'flex justify-center mt-2'},
                        title: { class: 'flex justify-center font-semibold text-2xl' },
                        subtitle: { class: 'flex justify-center font-medium text-center'},
                        content: { class: 'flex text-center px-2'}
                    }" style="width: 25em">
                        <template #header>
                            <img alt="user header" class="rounded-full" :src="imageUrl[uploadStore.fileName]" />
                        </template>
                        <template #title>
                            <div class="flex">
                                <div class="flex text-center">
                                    <span>{{accountStore.userName}}</span>
                                </div>
                            </div>
                        </template>
                        <template #subtitle>
                            <div class="flex flex-col">
                                <div class="flex text-center">
                                    <span>{{accountStore.userEmail}}</span>
                                </div>
                                <div class="flex flex-row space-x-2 mt-2">
                                    <Button class="bg-blue-400 text-blue-100 px-2 rounded">Add +</Button>
                                    <Button class="bg-green-400 text-green-100 px-2 rounded">Message</Button>
                                </div>
                            </div>
                        </template>
                        <template #content>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                                quas!
                            </p>
                        </template>
                        <template #footer>
                            <Button icon="pi pi-check" label="Save" />
                            <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
                        </template>
                    </Card>
                </div>
            </div>
            <div class="container">
                <div>
                    <Card :pt="{ 
                        root: { class: 'bg-gray-50 rounded shadow-lg mt-8'},
                        header: { class: 'flex justify-center mt-2'},
                        title: { class: 'flex justify-center font-semibold text-2xl' },
                        subtitle: { class: 'flex justify-center font-medium text-center'},
                        content: { class: 'flex text-center px-2'}
                    }" style="width: 25em">
                        <template #content>
                            <DropZone @files-dropped="addFiles" #default="{ dropZoneActive }">
                                <div class="border border-dashed w-full rounded border-gray-400 mt-2 mb-2 py-4">
                                    <span>Drop a file or <br />click to upload a profile picture</span>
                                    <div class="flex flex-row justify-center space-x-2 mt-2">
                                        <div>
                                            <label for="file-input" class="bg-blue-400 text-white rounded file-label">Select a file</label>
                                            <input type="file" id="file-input" multiple @change="onInputChange" />
                                        </div>
                                        <div>
                                            <Button class="bg-green-400 text-white rounded px-1 mb-1" @click="upload()">Upload</Button>
                                        </div>
                                    </div>
                                </div>
                            </DropZone>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
        <div class="grid col-span-8">
            <div class="flex flex-col space-y-6">
                <div class="container mt-16">
                    <Card class="mr-6 bg-gray-50"
                    :pt="{
                        root: { class: 'bg-gray-50 rounded shadow-lg'},
                        title: { class: 'flex text-emerald-500 font-semibold text-2xl px-2 pt-2' },
                        content: { class: 'flex text-gray-500 px-2 py-4'}
                    }"
                    >
                        <template #content>
                            <Fieldset class="rounded shadow w-1/2 py-2">
                                <template #legend>
                                    <div class="flex justify-center text-primary px-2 rounded">
                                        <span class="pi pi-user mr-2"></span>
                                        <span class="font-bold text-lg">User Details</span>
                                    </div>
                                </template>
                                <div class="flex flex-col">
                                    <div class="flex flex-col">
                                        <span>Username:</span>
                                        <div>
                                            <AutoComplete v-model="userName"></AutoComplete>
                                        </div>
                                    </div>
                                    <div class="flex flex-col pt-1">
                                        <span>Email:</span>
                                        <div>
                                            <AutoComplete :class="disabled ? 'bg-gray-50' : ''" v-model="userEmail"></AutoComplete>
                                        </div>
                                    </div>
                                </div>
                            </Fieldset>
                        </template>
                    </Card>
                </div>
                <div class="container">
                    <div class="mr-6 bg-gray-100 shadow rounded">
                        <span>test</span>
                        <TabView>
                            <TabPanel header="Header I">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </TabPanel>
                            <TabPanel header="Header II">
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                </p>
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAccountStore } from '../stores/useAccountStore';
import { useUploadStore } from '../stores/useUploadStore';
import { profilesService } from '../services/ProfilesService';
import Card from 'primevue/card';
import Fieldset from 'primevue/fieldset';
import AutoComplete from 'primevue/autocomplete';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import useFileList from '../composables/fileList';
import { reactive, ref, onMounted } from 'vue';
import DropZone from '../components/DropZone.vue'
import  FilePreview  from  '../components/FilePreview.vue'
import { useToast } from 'vue-toastification'
import { uploadsService } from '../services/UploadsService';
import _ from 'lodash';

const uploadStore = useUploadStore();
const accountStore = useAccountStore();
const toast = useToast();
const { userName, userEmail } = accountStore;
const editable = ref(false);
const { files, addFiles, removeFile } = useFileList()

let imageUrl = ref({});

onMounted(() => {
    if (!_.isEmpty(uploadStore.fileName)) {
        getProfilePic();
    }
})

async function getProfilePic() {
    let fileName = uploadStore.fileName;
    try {
        const fetchedImageUrl = await uploadsService.getProfilePic(fileName);
        imageUrl.value[fileName] = fetchedImageUrl;
    } catch (error) {
        console.error("Error fetching profile pic:", error);
    }
}

function editProfile() {
    editable.value = !editable.value
}

function onInputChange(e) {
    addFiles(e.target.files)
    e.target.value = null;
}

async function replacePic(formData) {
    try {
        // make this a promise that calls 'getProfilePic()'
        const replacementUpload = await profilesService.replaceProfilePic(accountStore.accountID, formData);
        console.log('replacement: ', replacementUpload)
        uploadStore.accountID = replacementUpload.accountID;
        uploadStore.fileName = replacementUpload.file_name;
        this.toast.success(`Your profile picture has been successfully updated!`)
        getProfilePic();
    } catch (error) {
        console.log("Error replacing old profile pic: ", error)
    }
}

async function upload() {
    let formData = new FormData();
    formData.append('file', files.value[0].file);
    
    if (!_.isEmpty(uploadStore.fileName)) {
        console.log('here')
        let fileToRemove = uploadStore.fileName
        formData.append('fileToRemove', fileToRemove);
        replacePic(formData);
        return;
    }
 
    try {
        const imageUpload = await profilesService.uploadProfilePic(accountStore.accountID, formData);
        uploadStore.accountID = imageUpload.accountID;
        uploadStore.fileName = imageUpload.file_name;
        this.toast.success(`Your profile picture has been successfully uploaded!`)
        getProfilePic();
    } catch (error) {
        console.log('Failed to upload image', error);
    }

}
</script>

<style scoped>
input[type="file"] { 
    opacity: 0; /* make transparent */
    z-index: -1; /* move under anything else */
    position: absolute; /* don't let it take up space */
  }

.file-label {
    padding-top: .125rem;
    padding-bottom: .125rem;
    padding-left: .175rem;
    padding-right: .175rem;
    cursor: pointer;
}
</style>