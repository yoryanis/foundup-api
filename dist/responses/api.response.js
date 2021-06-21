"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.ApiResponseRecords = void 0;
const class_validator_1 = require("class-validator");
const api_error_1 = require("./api.error");
const api_success_1 = require("./api.success");
const pagination_1 = require("../entities/pagination");
class ApiResponseRecords {
    constructor(queryResult, pagination = null) {
        this.records = queryResult[0];
        this.elementsPerPage = queryResult[0].length;
        this.page = pagination ? pagination.pageNumber : 1;
        this.totalPages =
            pagination == null
                ? 1
                : Math.ceil(queryResult[1] / pagination.pageElements);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Array)
], ApiResponseRecords.prototype, "records", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], ApiResponseRecords.prototype, "elementsPerPage", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], ApiResponseRecords.prototype, "page", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], ApiResponseRecords.prototype, "totalPages", void 0);
exports.ApiResponseRecords = ApiResponseRecords;
class ApiResponse {
    constructor(success, value, data = null) {
        const INCREMENT_FOR_SUCCESS = 1000;
        if (success) {
            let success = api_success_1.GET_SUCCESS(value);
            this.code = success.code + INCREMENT_FOR_SUCCESS;
            this.message = success.message;
            this.data = data;
        }
        else {
            let ex = api_error_1.GET_ERROR(value);
            this.code = ex.code;
            this.error = ex.error;
            if (data)
                this.data = data;
        }
    }
    static paginationWithDatesNotProvidedError() {
        return new ApiResponse(false, api_error_1.ERROR.PAGINATION_WAS_NOT_PROVIDED, pagination_1.PaginationVerifier.paginationWithDatesExample());
    }
    static paginationNotProvidedError() {
        return new ApiResponse(false, api_error_1.ERROR.PAGINATION_WAS_NOT_PROVIDED, pagination_1.PaginationVerifier.defaultPaginationExample());
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], ApiResponse.prototype, "code", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", String)
], ApiResponse.prototype, "message", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], ApiResponse.prototype, "error", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], ApiResponse.prototype, "data", void 0);
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api.response.js.map