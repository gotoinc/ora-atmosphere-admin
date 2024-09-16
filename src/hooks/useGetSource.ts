import { isFile } from '@/ts/guards/file.guard.ts';

export const getSource = (file: File | string) =>
    isFile(file) ? URL.createObjectURL(file) : file;
