export const useFormatFileSize = (sizeInBytes: number) => {
    const sizeInKB = (sizeInBytes / 1024).toFixed(2) + ' KB';
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    return sizeInBytes < 1024 * 1024 ? sizeInKB : sizeInMB;
};

export const getFileName = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
};
