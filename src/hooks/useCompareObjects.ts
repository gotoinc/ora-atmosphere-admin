// eslint-disable-next-line
export const useCompareObjects = <T extends Record<string, any>>(
    first: T,
    second: T
) => {
    // eslint-disable-next-line
    const differentValues: Record<string, any> = {};
    const keys = Object.keys(first);

    for (const key of keys) {
        if (first[key] !== second[key]) {
            // eslint-disable-next-line
            differentValues[key] = second[key];
        }
    }

    return Object.keys(differentValues).length > 0 ? differentValues : null; // return false, if objects are the same
};
