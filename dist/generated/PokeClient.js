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
const LeagueApi_1 = __importDefault(require("../generated/apis/LeagueApi"));
const PokemonApi_1 = __importDefault(require("../generated/apis/PokemonApi"));
const UserApi_1 = __importDefault(require("../generated/apis/UserApi"));
class PokeClient {
    constructor(host, port) {
        this.endpoint = "http://" + host + ":" + port;
    }
    Login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginResponse = yield axios_1.default.post(this.endpoint + "/auth/login", {}, {
                auth: {
                    username: username,
                    password: password
                }
            });
            return loginResponse.data;
        });
    }
    Register(email, password, firstName, lastName, role) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.post(this.endpoint + "/auth/register", {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                role: role
            });
        });
    }
    getLeagueApi(token) {
        return new LeagueApi_1.default(this.endpoint + "/api", token);
    }
    getPokemonApi(token) {
        return new PokemonApi_1.default(this.endpoint + "/api", token);
    }
    getUserApi(token) {
        return new UserApi_1.default(this.endpoint + "/api", token);
    }
}
exports.default = PokeClient;
//# sourceMappingURL=PokeClient.js.map