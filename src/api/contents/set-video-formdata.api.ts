import { isFile } from '@/ts/guards/file.guard.ts';
import type { ContentInput } from '@/validations/types/content.validation';

export const setVideoFormdata = (body: ContentInput) => {
    const formData = new FormData();
    formData.append('title', body.title);
    formData.append('description', body.description ?? '');
    formData.append('languages', body.languages.toString()); // Language ID
    formData.append('tags', body.tags ?? '');
    formData.append('requires_auth', String(body.requires_auth));
    formData.append('audio_enabled', String(body.audio_enabled));
    formData.append('narration_enabled', String(body.narration_enabled));
    formData.append('topic', String(body.topic)); // Topic ID
    formData.append('duration', String(body.duration));
    formData.append('preview_image', body.preview_image); // File object
    formData.append('image', body.image); // File object
    formData.append('file', body.file); // File object
    formData.append('date_created', body.date_created);

    // Test data
    formData.append('show_on_main_banner', String(true));
    formData.append('visible_for_unregistered', String(true));

    if (body.audios) {
        body.audios.forEach((audio) => {
            const name = isFile(audio.file) ? audio.file.name : audio.name;
            const duration = isFile(audio.file)
                ? audio.duration.toFixed()
                : audio.duration;
            const size = isFile(audio.file)
                ? audio.file.size.toFixed()
                : audio.size;

            formData.append('audios', audio.file);
            formData.append('audio_names', name);
            formData.append('audio_durations', String(duration));
            formData.append('audio_sizes', String(size));
        });
    }

    return formData;
};
