"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotBlank = void 0;
const class_validator_1 = require("class-validator");
function IsNotBlank(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'IsNotBlank',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (typeof value !== 'string')
                        return false;
                    const valueTrim = value.replace(/ /g, '');
                    if (valueTrim === '')
                        return false;
                    return true;
                },
            },
        });
    };
}
exports.IsNotBlank = IsNotBlank;
//# sourceMappingURL=is-not-blank.decorator.js.map