import { ref } from 'vue'

export default function () {
    const file = ref({});

    function addFiles(newFile) {
        let newUploadableFile = new UploadableFile(newFile[0]);
        file.value = newUploadableFile;
    }

    // refactor this for single file
    function removeFile(file) {
        const index = files.value.indexOf(file);

        if (index > -1) files.value.splice(index, 1);
    }

    return { file, addFiles, removeFile }
}

class UploadableFile {
    constructor(file) {
        console.log('file in constructor: ', file)
        this.file = file;
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.url = URL.createObjectURL(file)
        this.status = null
    }
}