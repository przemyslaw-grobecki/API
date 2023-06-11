import IUserAuthentication, { Token } from "../IUserAuthentication";
import LeagueApi from "../generated/apis/LeagueApi";
import PokemonApi from "../generated/apis/PokemonApi";
import UserApi from "../generated/apis/UserApi";
export default interface IPokeClient extends IUserAuthentication {
    getLeagueApi(token: Token): LeagueApi;
    getPokemonApi(token: Token): PokemonApi;
    getUserApi(token: Token): UserApi;
}
