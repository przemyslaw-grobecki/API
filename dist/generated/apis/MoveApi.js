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
const BaseApi_1 = __importDefault(require("../../BaseApi"));
const MoveRoute_1 = require("../routes/MoveRoute");
class MoveApi extends BaseApi_1.default {
    constructor() {
        /**	 * Standard CRUD	 */
        super(...arguments);
        this.Post = (move) => __awaiter(this, void 0, void 0, function* () {
            yield this.HttpPost(MoveRoute_1.MOVE_ROUTE, move);
        });
        this.Patch = (id, patch) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpPatch(MoveRoute_1.MOVE_ROUTE + "/" + id, patch);
        });
        this.Delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.HttpDelete(MoveRoute_1.MOVE_ROUTE + "/" + id);
        });
        this.GetAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpGetAll(MoveRoute_1.MOVE_ROUTE);
        });
        this.Get = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpGet(MoveRoute_1.MOVE_ROUTE + "/" + id);
        });
    }
}
exports.default = MoveApi;
//# sourceMappingURL=MoveApi.js.map