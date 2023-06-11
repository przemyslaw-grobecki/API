import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { Move } from "../resources/Move";
import { MOVE_ROUTE } from "../routes/MoveRoute";

export default class MoveApi extends BaseApi<Move> {
	/**	 * Standard CRUD	 */

	public Post = async (move: Move) : Promise<void> => {
		await this.HttpPost(this.priorPath + MOVE_ROUTE, move);
	}
      
	public Patch = async (id: string, patch: Move) : Promise<Move> => {
		return await this.HttpPatch(this.priorPath + MOVE_ROUTE + "/" + id, patch);
	}

	public Delete = async (id: string) : Promise<void> => {
		await this.HttpDelete(this.priorPath + MOVE_ROUTE + "/" + id);
	}

	public GetAll = async () : Promise<Array<Move>> => {
		return await this.HttpGetAll(this.priorPath + MOVE_ROUTE);
	}

	public Get = async (id: string) : Promise<Move> => {
		return await this.HttpGet(this.priorPath + MOVE_ROUTE + "/" + id);
	}
}
