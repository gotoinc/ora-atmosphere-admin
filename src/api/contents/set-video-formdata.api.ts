import type { VideoFile } from '@/ts/common';
import { isFile } from '@/ts/guards/file.guard.ts';
import type { ContentInput } from '@/validations/types/content.validation';

export const setVideoFormdata = (
    body: ContentInput | Partial<ContentInput>
): FormData => {
    const formData = new FormData();

    // Helper to append only if value is defined
    const appendIfDefined = (key: string, value: unknown) => {
        if (value !== undefined) {
            formData.append(key, String(value));
        }
    };

    // Helper to process media files
    const appendMediaFiles = (
        files: VideoFile[],
        fileKey: string,
        langKey: string
    ) => {
        files.forEach((file) => {
            formData.append(fileKey, file.file);
            formData.append(langKey, String(file.language.id));
        });
    };

    // Destructure body
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
        is_realtime: isRealtime,
        narration_enabled: isNarrationEnabled,
        new_video_files: newVideos,
        video_files_to_delete: videosToDelete,
    } = body;

    // Append primitive values
    appendIfDefined('title', title);
    appendIfDefined('description', description);
    appendIfDefined('tags', tags);
    appendIfDefined('date_created', date);
    appendIfDefined('duration', duration);
    appendIfDefined('topic', topic);
    appendIfDefined('requires_auth', isRequiresAuth);
    appendIfDefined(
        'visible_for_unregistered',
        isRequiresAuth !== undefined ? !isRequiresAuth : undefined
    );
    appendIfDefined('audio_enabled', isAudioEnabled);
    appendIfDefined('narration_enabled', isNarrationEnabled);
    appendIfDefined('is_realtime', isRealtime);
    appendIfDefined('show_on_main_banner', false); // Test data

    // Append file fields
    if (image) formData.append('preview_image', image);

    // Append audio data
    audios?.forEach((audio) => {
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

    // Append video files
    appendMediaFiles(videos ?? [], 'video_files', 'video_file_languages');
    appendMediaFiles(
        newVideos ?? [],
        'new_video_files',
        'new_video_file_languages'
    );

    // Append video files to delete
    videosToDelete?.forEach((id) => {
        formData.append('video_files_to_delete', String(id));
    });

    return formData;
};
