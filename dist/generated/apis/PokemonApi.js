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
const MoveApi_1 = __importDefault(require("./MoveApi"));
const BaseApi_1 = __importDefault(require("../../BaseApi"));
const PokemonRoute_1 = require("../routes/PokemonRoute");
class PokemonApi extends BaseApi_1.default {
    constructor() {
        /**	 * Standard CRUD	 */
        super(...arguments);
        this.Post = (pokemon) => __awaiter(this, void 0, void 0, function* () {
            yield this.HttpPost(PokemonRoute_1.POKEMON_ROUTE, pokemon);
        });
        this.Patch = (id, patch) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpPatch(PokemonRoute_1.POKEMON_ROUTE + "/" + id, patch);
        });
        this.Delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.HttpDelete(PokemonRoute_1.POKEMON_ROUTE + "/" + id);
        });
        this.GetAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpGetAll(PokemonRoute_1.POKEMON_ROUTE);
        });
        this.Get = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HttpGet(PokemonRoute_1.POKEMON_ROUTE + "/" + id);
        });
        /**
        * Pokemon children APIs
        */
        this.getMoveApi = (pokemonId, token) => {
            return new MoveApi_1.default(this.priorPath + PokemonRoute_1.POKEMON_ROUTE + "/" + pokemonId, token);
        };
    }
}
exports.default = PokemonApi;
//# sourceMappingURL=PokemonApi.js.map