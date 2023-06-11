"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class BaseApi {
    constructor(priorPath = "", token) {
        this.priorPath = priorPath;
        this.axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }
    refreshToken(token) {
        this.axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }
    ;
    /**
     * Https get
     * @param route
     * @returns get
     */
    HttpGetAll(route) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceResponse = yield axios_1.default.get(this.priorPath + route, this.axiosConfig);
            return resourceResponse.data;
        });
    }
    /**
     * Https get
     * @param route
     * @returns get
     */
    HttpGet(route) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceResponse = yield axios_1.default.get(this.priorPath + route, this.axiosConfig);
            return resourceResponse.data;
        });
    }
    /**
     * Https post
     * @param route
     */
    HttpPost(route, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post(this.priorPath + route, data, this.axiosConfig);
        });
    }
    /**
     * Https delete
     * @param route
     */
    HttpDelete(route) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.delete(this.priorPath + route, this.axiosConfig);
        });
    }
    /**
     * Https patch
     * @param route
     */
    HttpPatch(route, patch) {
        return __awaiter(this, void 0, void 0, function* () {
            const patchedResourceResponse = yield axios_1.default.patch(this.priorPath + route, patch, this.axiosConfig);
            return patchedResourceResponse.data;
        });
    }
}
exports.default = BaseApi;
//# sourceMappingURL=BaseApi.js.map