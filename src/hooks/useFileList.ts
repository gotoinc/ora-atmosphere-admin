import type { Ref } from 'vue';
import { ref } from 'vue';

export const useFiles = () => {
    // Define the type for the file array
    const files: Ref<UploadableFile[]> = ref([]);

    // Define the function to add new files
    const addFiles = (newFiles: FileList | File[]) => {
        const newUploadableFiles = Array.from(newFiles)
            .map((file) => new UploadableFile(file))
            .filter((file) => !fileExists(file.id));

        files.value = files.value.concat(newUploadableFiles);
    };

    // Define the function to check if a file already exists
    const fileExists = (otherId: string): boolean => {
        return files.value.some(({ id }) => id === otherId);
    };

    // Define the function to remove a file
    const removeFile = (file: UploadableFile) => {
        const index = files.value.indexOf(file);

        if (index > -1) files.value.splice(index, 1);
    };

    return { files, addFiles, removeFile };
};

// Define the class for uploadable files
class UploadableFile {
    file: File;
    id: string;
    name: string;
    url: string;
    status: string | null;

    constructor(file: File) {
        this.file = file;
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
        this.name = file.name;
        this.url = URL.createObjectURL(file);
        this.status = null;
    }
}

export type { UploadableFile };
