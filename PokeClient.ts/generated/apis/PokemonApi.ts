import MoveApi from "./MoveApi";
import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { Pokemon } from "../resources/Pokemon";
import { POKEMON_ROUTE } from "../routes/PokemonRoute";

export default class PokemonApi extends BaseApi<Pokemon> {
	/**	 * Standard CRUD	 */

	public Post = async (pokemon: Pokemon) : Promise<void> => {
		await this.HttpPost(POKEMON_ROUTE, pokemon);
	}
      
	public Patch = async (id: string, patch: Pokemon) : Promise<Pokemon> => {
		return await this.HttpPatch(POKEMON_ROUTE + "/" + id, patch);
	}

	public Delete = async (id: string) : Promise<void> => {
		await this.HttpDelete(POKEMON_ROUTE + "/" + id);
	}

	public GetAll = async () : Promise<Array<Pokemon>> => {
		return await this.HttpGetAll(POKEMON_ROUTE);
	}

	public Get = async (id: string) : Promise<Pokemon> => {
		return await this.HttpGet(POKEMON_ROUTE + "/" + id);
	}

	/**
	* Pokemon children APIs
	*/
	public getMoveApi = (pokemonId: string, token: Token) => {
		return new MoveApi(this.priorPath + POKEMON_ROUTE + "/" + pokemonId, token);
	}
}
