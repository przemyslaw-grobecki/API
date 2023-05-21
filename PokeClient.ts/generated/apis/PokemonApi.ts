import BaseApi from "../../BaseApi";
import { Pokemon } from "../resources/Pokemon";
import { POKEMON_ROUTE } from "../routes/PokemonRoute";

export default class PokemonApi extends BaseApi<Pokemon> {
	/**	 * Standard CRUD	 */

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
