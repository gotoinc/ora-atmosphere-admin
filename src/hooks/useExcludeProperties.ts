export const useExcludeProperties = <
    T extends Record<string, unknown>,
    K extends keyof T,
>(
    obj: T,
    properties: K[]
): Omit<T, K> => {
    const newObject = Object.keys(obj).reduce<Partial<T>>((result, key) => {
        if (!properties.includes(key as K)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            (result as T)[key as K] = obj[key as K];
        }
        return result;
    }, {});

    return newObject as Omit<T, K>;
};
