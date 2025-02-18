import { getBlobFile } from '@/api/contents/get-blob-file.api.ts';
import { getFileName } from '@/hooks/useFormatFile.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';

export const getFile = async (src: string) => {
    try {
        const blob = await getBlobFile(src);

        if (blob) {
            return new File([blob], getFileName(src), {
                type: blob.type,
                lastModified: new Date().getTime(),
            });
        }
    } catch (e) {
        useThrowError(e);
    }
};
