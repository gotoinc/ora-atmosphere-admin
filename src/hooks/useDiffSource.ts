import type { Audio, VideoFile } from '@/ts/common';
import type { CreateAudio } from '@/validations/types/content.validation';

export const useDiffSource = (
    array1: Array<CreateAudio | VideoFile | Audio>,
    array2: Array<CreateAudio | VideoFile | Audio>
) => {
    const editedValues = array1.filter((audio) => !audio.hasOwnProperty('id'));

    const differences = array1.filter(
        (item1) =>
            !array2.some((item2) => item1.language.id === item2.language.id)
    );

    return (
        editedValues.length ||
        array1.length !== array2.length ||
        differences.length > 0
    );
};
