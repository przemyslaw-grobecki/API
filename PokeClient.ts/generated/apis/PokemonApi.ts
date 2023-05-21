import BaseApi from "../../BaseApi";
import { Pokemon } from "../resources/Pokemon";
import { POKEMON_ROUTE } from "../routes/PokemonRoute";

export default class PokemonApi extends BaseApi<Pokemon> {
	/**	 * Standard CRUD	 */

	public Post = async (id: string, pokemon: Pokemon) : Promise<void> => {
		await this.HttpPost(this.priorPath + POKEMON_ROUTE, pokemon);
	}
      
	public Patch = async (id: string, patch: Pokemon) : Promise<Pokemon> => {
		return await this.HttpPatch(this.priorPath + POKEMON_ROUTE + "/" + id, patch);
	}

	public Delete = async (id: string) : Promise<void> => {
		await this.HttpDelete(this.priorPath + POKEMON_ROUTE + "/" + id);
	}

	public GetAll = async () : Promise<Array<Pokemon>> => {
		return await this.HttpGetAll(this.priorPath + POKEMON_ROUTE);
	}

	public Get = async (id: string) : Promise<Pokemon> => {
		return await this.HttpGet(this.priorPath + POKEMON_ROUTE + "/" + id);
	}
}
