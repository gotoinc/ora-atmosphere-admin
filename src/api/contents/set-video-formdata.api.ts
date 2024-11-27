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
        video_files: videos,
        duration,
        requires_auth: isRequiresAuth,
        audio_enabled: isAudioEnabled,
        narration_enabled: isNarrationEnabled,
        new_video_files: newVideos,
        video_files_to_delete: videosToDelete,
    } = body;

    if (title) {
        formData.append('title', title);
    }

    if (image) {
        formData.append('preview_image', image); // File object
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

    if (audios) {
        if (audios.length > 0) {
            audios.forEach((audio) => {
                const duration = isFile(audio.file)
                    ? audio.duration.toFixed()
                    : audio.duration;

                const size = isFile(audio.file)
                    ? audio.file.size.toFixed()
                    : audio.size;

                const name = isFile(audio.file) ? audio.file.name : '';

                formData.append('audio_files', audio.file);
                formData.append('audio_names', name);
                formData.append('audio_durations', String(duration));
                formData.append('audio_sizes', String(size));
                formData.append('audio_languages', String(audio.language.id));
            });
        } else {
            formData.append('clear_audios', String(true));
        }
    }

    if (videos?.length) {
        videos.forEach((video) => {
            formData.append('video_files', video.file);
            formData.append('video_file_languages', String(video.language.id));
        });
    }

    if (newVideos?.length) {
        newVideos.forEach((video) => {
            formData.append(`new_video_files`, video.file);
            formData.append(
                `new_video_file_languages`,
                String(video.language.id)
            );
        });
    }

    if (videosToDelete?.length) {
        videosToDelete.forEach((id) => {
            formData.append(`video_files_to_delete`, String(id));
        });
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
