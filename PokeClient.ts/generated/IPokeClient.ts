
import IUserAuthentication from "./IUserAuthentication";
import LeagueApi from "../generated/apis/LeagueApi";
import MoveApi from "../generated/apis/MoveApi";
import PokemonApi from "../generated/apis/PokemonApi";
import UserApi from "../generated/apis/UserApi";

export default interface IPokeClient extends IUserAuthentication 
{
    Login() : void;
    Register(): void;

	getLeagueApi() : LeagueApi;

	getPokemonApi() : PokemonApi;

	getUserApi() : UserApi;

} 
