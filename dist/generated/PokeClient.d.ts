import IPokeClient from "./IPokeClient";
import { Token, Role } from "../IUserAuthentication";
import LeagueApi from "../generated/apis/LeagueApi";
import PokemonApi from "../generated/apis/PokemonApi";
import UserApi from "../generated/apis/UserApi";
export default class PokeClient implements IPokeClient {
    endpoint: string;
    constructor(host: string, port: string);
    Login(username: string, password: string): Promise<Token>;
    Register(email: string, password: string, firstName: string, lastName: string, role: Role): Promise<Token>;
    getLeagueApi(token: Token): LeagueApi;
    getPokemonApi(token: Token): PokemonApi;
    getUserApi(token: Token): UserApi;
}
