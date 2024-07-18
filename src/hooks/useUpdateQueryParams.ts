import router from '@/router';
import type { Identifiable } from '@/ts/common';

type FilterValue = string | Identifiable | null;

export const useUpdateQueryParams = <T extends Record<string, FilterValue>>(
    filters: T
) => {
    const query = { ...router.currentRoute.value.query } as Record<
        string,
        number | string
    >;

    for (const key in filters) {
        const keyValue = filters[key];
        if (keyValue) {
            query[key] =
                typeof keyValue === 'object' && 'id' in keyValue
                    ? keyValue['id']
                    : keyValue;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete query[key];
        }
    }

    void router.push({ query });
};
