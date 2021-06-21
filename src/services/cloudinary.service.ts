import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';

import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/constant';

const _configService = new ConfigService();
const bucket = _configService
  .get(Configuration.CLOUDINARY_CLOUD_NAME)
  .replace(/\s/gim, '');
const key = _configService
  .get(Configuration.CLOUDINARY_KEY)
  .replace(/\s/gim, '');
const secret = _configService
  .get(Configuration.CLOUDINARY_SECRET)
  .replace(/\s/gim, '');

const config = {
  cloud_name: bucket,
  api_key: key,
  api_secret: secret,
};

Cloudinary.config(config);

const uploadFile = async (
  filePath: string,
  tag?: string,
  id?: string,
): Promise<UploadApiResponse> => {
  let responseFromCloudinary: UploadApiResponse;
  const fieldsExists =
    (tag != null || tag != undefined) && (id != null || id != undefined);
  if (fieldsExists) {
    responseFromCloudinary = await Cloudinary.uploader.upload(filePath, {
      public_id: `${tag}/${id}`,
      tags: tag,
    });
  } else {
    responseFromCloudinary = await Cloudinary.uploader.upload(filePath);
  }
  return responseFromCloudinary;
};

const removeFile = async (url: string): Promise<{ success: boolean }> => {
  const urlParts = url.split('/');
  const publicIdParts = urlParts[urlParts.length - 1].split('.');
  const publicId = publicIdParts[0];
  let responseFromCloudinary: { result: string };
  responseFromCloudinary = await Cloudinary.uploader.destroy(publicId);
  if (responseFromCloudinary.result === 'ok') return { success: true };
  return { success: false };
};

export { uploadFile, removeFile };
