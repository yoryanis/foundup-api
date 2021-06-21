"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsLength = void 0;
const class_validator_1 = require("class-validator");
function IsLength(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'IsNotBlank',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (value.toString().length > 6 && value.toString().length < 11)
                        return true;
                },
            },
        });
    };
}
exports.IsLength = IsLength;
//# sourceMappingURL=length.decorator.js.map