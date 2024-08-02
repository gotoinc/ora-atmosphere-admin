export const useCompareObjects = <
    // eslint-disable-next-line
    T extends Record<string, any>,
    // eslint-disable-next-line
    U extends Record<string, any>,
>(
    first: T,
    second: U
    // eslint-disable-next-line
) => {
    // eslint-disable-next-line
    const differentValues: Record<string, any> = {};
    const keys = new Set([...Object.keys(first), ...Object.keys(second)]);

    for (const key of keys) {
        if (first[key] !== second[key]) {
            if (
                key in second &&
                typeof second[key] !== 'object' &&
                second[key] !== null
            ) {
                // eslint-disable-next-line
                differentValues[key] = second[key];
            }
        }
    }

    return differentValues;
};

export const useCompareArrays = (
    first: Array<number | string>,
    second: Array<number | string>
) => {
    const differentValues: Record<number, number | string> = {};

    const length = Math.max(first.length, second.length);

    for (let i = 0; i < length; i++) {
        if (first[i] !== second[i]) {
            differentValues[i] = second[i];
        }
    }

    return Object.keys(differentValues).length > 0;
};
