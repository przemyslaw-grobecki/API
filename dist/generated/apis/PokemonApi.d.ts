import MoveApi from "./MoveApi";
import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { Pokemon } from "../resources/Pokemon";
export default class PokemonApi extends BaseApi<Pokemon> {
    /**	 * Standard CRUD	 */
    Post: (id: string, pokemon: Pokemon) => Promise<void>;
    Patch: (id: string, patch: Pokemon) => Promise<Pokemon>;
    Delete: (id: string) => Promise<void>;
    GetAll: () => Promise<Array<Pokemon>>;
    Get: (id: string) => Promise<Pokemon>;
    /**
    * Pokemon children APIs
    */
    getMoveApi: (pokemonId: string, token: Token) => MoveApi;
}
