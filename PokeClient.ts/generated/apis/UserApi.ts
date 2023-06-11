import LeagueApi from "./LeagueApi";
import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { User } from "../resources/User";
import { USER_ROUTE } from "../routes/UserRoute";

export default class UserApi extends BaseApi<User> {
	/**	 * Standard CRUD	 */

	public Post = async (user: User) : Promise<void> => {
		await this.HttpPost(USER_ROUTE, user);
	}
      
	public Patch = async (id: string, patch: User) : Promise<User> => {
		return await this.HttpPatch(USER_ROUTE + "/" + id, patch);
	}

	public Delete = async (id: string) : Promise<void> => {
		await this.HttpDelete(USER_ROUTE + "/" + id);
	}

	public GetAll = async () : Promise<Array<User>> => {
		return await this.HttpGetAll(USER_ROUTE);
	}

	public Get = async (id: string) : Promise<User> => {
		return await this.HttpGet(USER_ROUTE + "/" + id);
	}

	/**
	* User children APIs
	*/
	public getLeagueApi = (userId: string, token: Token) => {
		return new LeagueApi(this.priorPath + USER_ROUTE + "/" + userId, token);
	}
}
