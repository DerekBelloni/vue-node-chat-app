<template>
    <div class="mx-8 mt-8">
        <a href="/"><button class="shadow rounded bg-rose-500 text-rose-100 px-2 py-1">Home</button></a>
    </div>
    <div class="container mx-auto mt-16 flex justify-center">
        <div class="shadow-xl rounded bg-wite w-3/4 border border-gray-100">
            <div class="px-4 py-4">
                <div class="flex flex-row">
                    <div class="flex flex-col">
                        <div class="flex flex-row space-x-6">
                            <span class="text-rose-500 font-medium text-lg">Edit Profile</span>
                            <a @click="editProfile()"><font-awesome-icon class="text-rose-500 cursor-pointer" icon="fa-regular fa-pen-to-square" /></a>
                        </div>
                        <div v-if="!editable" class="flex flex-row justify-between">
                            <span class="text-gray-500">Username:&nbsp;&nbsp;&nbsp;&nbsp;{{profileData.username}}</span>
                        </div>
                        <div v-else class="grid grid-cols-12 mt-4">
                            <div class="col-start-1 col-span-2">
                                <span class="text-gray-500">Username:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <div class="col-start-3 col-span-8">
                                <input type="text" v-model="profileData.username" class="w-1/2 h-7 text-sm rounded shadow-inner border border-gray-200 pl-1 focus:ring-0 focus:ring-transparent">
                            </div>
                        </div>
                        <div v-if="!editable">
                            <span class="text-gray-500">Email:&nbsp;&nbsp;&nbsp;&nbsp;{{profileData.email}}</span>
                        </div>
                        <div v-else class="grid grid-cols-12 mt-4">
                            <div class="col-start-1 col-span-2">
                                <span class="text-gray-500">Email:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <div class="col-start-3 col-span-8">
                                <input type="text" v-model="profileData.email" class="w-1/2 h-7 text-sm rounded shadow-inner border border-gray-200 pl-1 focus:ring-0 focus:ring-transparent">
                            </div>
                        </div>
                        <!-- Add Ability to Reset Password -->
                        <!-- <div v-if="editable" class="grid grid-cols-12 mt-4">
                            <div class="col-start-1 col-span-2">
                                
                            </div>
                        </div> -->
                    </div>
                    <div class="ml-4 flex-1 flew-row">
                        <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
                            <label for="fileinput">
                                <span v-if="dropZoneActive">
                                    <span>Drop Them Here</span>
                                    <span class="smaller">to add them</span>
                                </span>
                                <span v-else>
                                    <span>Drag Your Files Here</span>
                                    <span class="smaller">
                                        or <strong><em>click here</em></strong> to select files
                                    </span>
                                </span>

                                <input type="file" id="file-input" multiple @change="onInputChange"/>
                            </label>
                        </DropZone>
                    </div>
                    <ul v-show="files.length">
                        <li class="list-disc" v-for="file of files" :key="file.id">{{ file.file.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAccountStore } from '../stores/useAccountStore';
import useFileList from '../composables/fileList'
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue';
import DropZone from '../components/DropZone.vue'

const accountStore = useAccountStore();
const { userName, userEmail } = accountStore;
const editable = ref(false);
const { files, addFiles, removeFile } = useFileList()

let profileData = reactive({
    username: userName,
    email: userEmail
})


function editProfile() {
    editable.value = !editable.value
}

function onInputChange(e) {
    addFiles(e.target.files)
    e.target.value = null;
}
</script>

<style scoped lang="stylus">
.drop-area {
	width: 60%;
	max-width: 300px;
	margin: 0 auto;
	padding: 50px;
	background: #ffffff55;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	transition: .2s ease;

	&[data-active=true] {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		background: #ffffffcc;
	}
}

label {
	font-size: 16px;
	cursor: pointer;
	display: block;

	span {
		display: block;
	}

	input[type=file]:not(:focus-visible) {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		margin: -1px !important;
		overflow: hidden !important;
		clip: rect(0, 0, 0, 0) !important;
		white-space: nowrap !important;
		border: 0 !important;
	}

	.smaller {
		font-size: 16px;
	}
}
</style>