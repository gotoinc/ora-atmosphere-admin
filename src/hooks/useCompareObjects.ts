export const useCompareObjects = (
    first: NonNullable<unknown>,
    second: NonNullable<unknown>
) => {
    const keys = Object.keys(first);

    for (const key of keys) {
        if (first[key] !== second[key]) {
            return false; // return false, if objects are different
        }
    }

    return true; // return true, if objects are the same
};
