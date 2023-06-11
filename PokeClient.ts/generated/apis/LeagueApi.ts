import UserApi from "./UserApi";
import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { League } from "../resources/League";
import { LEAGUE_ROUTE } from "../routes/LeagueRoute";

export default class LeagueApi extends BaseApi<League> {
	/**	 * Standard CRUD	 */

	public Post = async (id: string, league: League) : Promise<void> => {
		await this.HttpPost(this.priorPath + LEAGUE_ROUTE, league);
	}
      
	public Patch = async (id: string, patch: League) : Promise<League> => {
		return await this.HttpPatch(this.priorPath + LEAGUE_ROUTE + "/" + id, patch);
	}

	public Delete = async (id: string) : Promise<void> => {
		await this.HttpDelete(this.priorPath + LEAGUE_ROUTE + "/" + id);
	}

	public GetAll = async () : Promise<Array<League>> => {
		return await this.HttpGetAll(this.priorPath + LEAGUE_ROUTE);
	}

	public Get = async (id: string) : Promise<League> => {
		return await this.HttpGet(this.priorPath + LEAGUE_ROUTE + "/" + id);
	}

	/**
	* League children APIs
	*/
	public getUserApi = (leagueId: string, token: Token) => {
		return new UserApi(this.priorPath + LEAGUE_ROUTE + "/" + leagueId, token);
	}
}
