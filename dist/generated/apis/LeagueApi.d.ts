import UserApi from "./UserApi";
import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { League } from "../resources/League";
export default class LeagueApi extends BaseApi<League> {
    /**	 * Standard CRUD	 */
    Post: (id: string, league: League) => Promise<void>;
    Patch: (id: string, patch: League) => Promise<League>;
    Delete: (id: string) => Promise<void>;
    GetAll: () => Promise<Array<League>>;
    Get: (id: string) => Promise<League>;
    /**
    * League children APIs
    */
    getUserApi: (leagueId: string, token: Token) => UserApi;
}
