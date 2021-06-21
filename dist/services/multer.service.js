"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FILTER_OPTIONS = exports.IMAGE_FILTER_OPTIONS = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
const IMAGE_FILTER_OPTIONS = {
    storage: multer_1.diskStorage({
        destination: './files',
        filename: editFileName
    }),
    fileFilter: imageFileFilter
};
exports.IMAGE_FILTER_OPTIONS = IMAGE_FILTER_OPTIONS;
const DEFAULT_FILTER_OPTIONS = {
    storage: multer_1.diskStorage({
        destination: './files',
        filename: editFileName
    })
};
exports.DEFAULT_FILTER_OPTIONS = DEFAULT_FILTER_OPTIONS;
//# sourceMappingURL=multer.service.js.map