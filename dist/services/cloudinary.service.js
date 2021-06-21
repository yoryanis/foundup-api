"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const config_service_1 = require("../config/config.service");
const constant_1 = require("../config/constant");
const _configService = new config_service_1.ConfigService();
const bucket = _configService
    .get(constant_1.Configuration.CLOUDINARY_CLOUD_NAME)
    .replace(/\s/gim, '');
const key = _configService
    .get(constant_1.Configuration.CLOUDINARY_KEY)
    .replace(/\s/gim, '');
const secret = _configService
    .get(constant_1.Configuration.CLOUDINARY_SECRET)
    .replace(/\s/gim, '');
const config = {
    cloud_name: bucket,
    api_key: key,
    api_secret: secret,
};
cloudinary_1.v2.config(config);
const uploadFile = async (filePath, tag, id) => {
    let responseFromCloudinary;
    const fieldsExists = (tag != null || tag != undefined) && (id != null || id != undefined);
    if (fieldsExists) {
        responseFromCloudinary = await cloudinary_1.v2.uploader.upload(filePath, {
            public_id: `${tag}/${id}`,
            tags: tag,
        });
    }
    else {
        responseFromCloudinary = await cloudinary_1.v2.uploader.upload(filePath);
    }
    return responseFromCloudinary;
};
exports.uploadFile = uploadFile;
const removeFile = async (url) => {
    const urlParts = url.split('/');
    const publicIdParts = urlParts[urlParts.length - 1].split('.');
    const publicId = publicIdParts[0];
    let responseFromCloudinary;
    responseFromCloudinary = await cloudinary_1.v2.uploader.destroy(publicId);
    if (responseFromCloudinary.result === 'ok')
        return { success: true };
    return { success: false };
};
exports.removeFile = removeFile;
//# sourceMappingURL=cloudinary.service.js.map