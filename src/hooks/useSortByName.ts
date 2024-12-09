import type { Identifiable } from '@/ts/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SortableArray = Array<Identifiable & { [key: string]: any }>;

export const useSortByName = (array: SortableArray) => {
    return array
        .map((item) => {
            return {
                name: item.name,
                id: item.id,
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
};
