import router from '@/router';
import type { CategoryBrief } from '@/ts/catalog';

type FilterValue = string | CategoryBrief | null;

export const useUpdateQueryParams = <T extends Record<string, FilterValue>>(
    filters: T
) => {
    const query = { ...router.currentRoute.value.query } as Record<
        string,
        string
    >;

    for (const key in filters) {
        const keyValue = filters[key];
        if (keyValue) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            query[key] =
                typeof keyValue === 'object' && 'name' in keyValue
                    ? keyValue['name']
                    : keyValue;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete query[key];
        }
    }

    void router.push({ query });
};
