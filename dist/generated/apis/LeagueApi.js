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
const UserApi_1 = __importDefault(require("./UserApi"));
const BaseApi_1 = __importDefault(require("../../BaseApi"));
const LeagueRoute_1 = require("../routes/LeagueRoute");
class LeagueApi extends BaseApi_1.default {
    constructor() {
        /**	 * Standard CRUD	 */
        super(...arguments);
        this.Post = (id, league) => __awaiter(this, void 0, void 0, function* () {
            yield this.HttpPost(this.priorPath + LeagueRoute_1.LEAGUE_ROUTE, league);
        });
        this.Patch = (id, patch) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpPatch(this.priorPath + LeagueRoute_1.LEAGUE_ROUTE + "/" + id, patch);
        });
        this.Delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.HttpDelete(this.priorPath + LeagueRoute_1.LEAGUE_ROUTE + "/" + id);
        });
        this.GetAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpGetAll(this.priorPath + LeagueRoute_1.LEAGUE_ROUTE);
        });
        this.Get = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpGet(this.priorPath + LeagueRoute_1.LEAGUE_ROUTE + "/" + id);
        });
        /**
        * League children APIs
        */
        this.getUserApi = (leagueId, token) => {
            return new UserApi_1.default(this.priorPath + LeagueRoute_1.LEAGUE_ROUTE + "/" + leagueId, token);
        };
    }
}
exports.default = LeagueApi;
//# sourceMappingURL=LeagueApi.js.map