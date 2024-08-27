import { isFile } from '@/ts/guards/file.guard.ts';
import type { ContentInput } from '@/validations/types/content.validation';

export const setVideoFormdata = (
    body: ContentInput | Partial<ContentInput>
) => {
    const formData = new FormData();

    const {
        description,
        title,
        tags,
        audios,
        topic,
        date_created: date,
        preview_image: image,
        file,
        duration,
        language: videoLanguage,
        requires_auth: isRequiresAuth,
        audio_enabled: isAudioEnabled,
        narration_enabled: isNarrationEnabled,
    } = body;

    if (title) {
        formData.append('title', title);
    }

    if (image) {
        formData.append('preview_image', image); // File object
    }

    if (file) {
        formData.append('file', file); // File object
    }

    if (date) {
        formData.append('date_created', date);
    }

    if (duration) {
        formData.append('duration', String(duration));
    }

    if (topic) {
        formData.append('topic', String(topic));
    }

    if (videoLanguage) {
        formData.append('language_id', String(videoLanguage));
    }

    if (audios) {
        if (audios.length > 0) {
            audios.forEach((audio) => {
                const duration = isFile(audio.file)
                    ? audio.duration.toFixed()
                    : audio.duration;

                const size = isFile(audio.file)
                    ? audio.file.size.toFixed()
                    : audio.size;

                formData.append('audios', audio.file);
                formData.append('audio_names', audio.name);
                formData.append('audio_durations', String(duration));
                formData.append('audio_sizes', String(size));
                formData.append('audio_languages', String(audio.language.id));
            });
        } else {
            formData.append('clear_audios', String(true));
        }
    }

    if (description) {
        formData.append('description', description);
    }

    if (tags) {
        formData.append('tags', tags);
    }

    if (isRequiresAuth !== undefined) {
        formData.append('requires_auth', String(isRequiresAuth));
        formData.append('visible_for_unregistered', String(!isRequiresAuth));
    }

    if (isAudioEnabled !== undefined) {
        formData.append('audio_enabled', String(isAudioEnabled));
    }

    if (isNarrationEnabled !== undefined) {
        formData.append('narration_enabled', String(isNarrationEnabled));
    }

    // Test data
    formData.append('show_on_main_banner', String(false));

    return formData;
};
