export const useCompareObjects = (
    first: Record<string, unknown>,
    second: Record<string, unknown>
) => {
    const differentValues: Record<string, unknown> = {};
    const keys = Object.keys(first);

    for (const key of keys) {
        if (first[key] !== second[key]) {
            differentValues[key] = second[key];
        }
    }

    return Object.keys(differentValues).length > 0 ? differentValues : null; // return false, if objects are the same
};
