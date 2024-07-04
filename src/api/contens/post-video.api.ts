import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Audio } from '@/ts/common';

interface ContentInput {
    file: File;
    title: string;
    description?: string;
    languages: string;
    tags?: string;
    requires_auth: boolean;
    audio_enabled: boolean;
    narration_enabled: boolean;
    show_on_main_banner: boolean;
    visible_for_unregistered?: boolean;
    duration: number;
    date_created: string;
    audios?: Audio[];
}

export const postVideo = async (body: ContentInput) => {
    try {
        const res = await axios.postForm<ContentInput>(`/admin/videos/`, body);

        return res.data;
    } catch (err) {
        useThrowError(err);
    }
};
