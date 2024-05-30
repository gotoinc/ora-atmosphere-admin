export const useExcludeProperties = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Record<string, any>,
    K extends keyof T,
>(
    obj: T,
    properties: K[]
): Omit<T, K> => {
    const newObject = Object.keys(obj).reduce((result, key) => {
        if (!properties.includes(key as K)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            result[key] = obj[key];
        }
        return result;
    }, {});

    return newObject as Omit<T, K>;
};
