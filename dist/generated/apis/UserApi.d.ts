import LeagueApi from "./LeagueApi";
import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { User } from "../resources/User";
export default class UserApi extends BaseApi<User> {
    /**	 * Standard CRUD	 */
    Post: (user: User) => Promise<void>;
    Patch: (id: string, patch: User) => Promise<User>;
    Delete: (id: string) => Promise<void>;
    GetAll: () => Promise<Array<User>>;
    Get: (id: string) => Promise<User>;
    /**
    * User children APIs
    */
    getLeagueApi: (userId: string, token: Token) => LeagueApi;
}
