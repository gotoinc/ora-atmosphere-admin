import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { ContentInput } from '@/validations/types/content.validation';

export const postVideo = async (body: ContentInput) => {
    try {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description ?? '');
        formData.append('languages', String(body.languages)); // Language ID
        formData.append('tags', body.tags ?? '');
        formData.append('requires_auth', String(body.requires_auth));
        formData.append('audio_enabled', String(body.audio_enabled));
        formData.append('narration_enabled', String(body.narration_enabled));
        formData.append('topic', String(body.topic)); // Topic ID
        formData.append('duration', String(body.duration));
        formData.append('preview_image', body.preview_image); // File object
        formData.append('image', body.preview_image); // File object
        formData.append('file', body.file); // File object
        formData.append('show_on_main_banner', String(true)); // File object
        formData.append('visible_for_unregistered', String(true));
        formData.append('is_featured ', String(true));
        formData.append('date_created', new Date().toISOString());

        if (body.audios) {
            body.audios.forEach((audioFile) => {
                formData.append('audios', audioFile); // Multiple File objects
            });
        }

        const res = await axios.post<ContentInput>(
            `/admin/videos/create_video/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
