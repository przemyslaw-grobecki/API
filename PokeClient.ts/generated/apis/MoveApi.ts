import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { Move } from "../resources/Move";
import { MOVE_ROUTE } from "../routes/MoveRoute";

export default class MoveApi extends BaseApi<Move> {
	/**	 * Standard CRUD	 */

	public Post = async (move: Move) : Promise<void> => {
		await this.HttpPost(MOVE_ROUTE, move);
	}
      
	public Patch = async (id: string, patch: Move) : Promise<Move> => {
		return await this.HttpPatch(MOVE_ROUTE + "/" + id, patch);
	}

	public Delete = async (id: string) : Promise<void> => {
		await this.HttpDelete(MOVE_ROUTE + "/" + id);
	}

	public GetAll = async () : Promise<Array<Move>> => {
		return await this.HttpGetAll(MOVE_ROUTE);
	}

	public Get = async (id: string) : Promise<Move> => {
		return await this.HttpGet(MOVE_ROUTE + "/" + id);
	}
}
