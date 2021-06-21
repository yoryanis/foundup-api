import { UploadApiResponse } from 'cloudinary';
declare const uploadFile: (filePath: string, tag?: string, id?: string) => Promise<UploadApiResponse>;
declare const removeFile: (url: string) => Promise<{
    success: boolean;
}>;
export { uploadFile, removeFile };
