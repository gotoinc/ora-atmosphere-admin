export type KeysToString<T> = {
    [K in keyof T & string]: T[K];
};
