
import IUserAuthentication from "./IUserAuthentication";
import LeagueApi from "../generated/apis/LeagueApi";
import MoveApi from "../generated/apis/MoveApi";
import PokemonApi from "../generated/apis/PokemonApi";
import UserApi from "../generated/apis/UserApi";

import { Token } from "./PokeClient";

export default interface IPokeClient extends IUserAuthentication 
{
    Login() : Token;
    Register(): Token;

	getLeagueApi(token : Token) : LeagueApi;

	getPokemonApi(token : Token) : PokemonApi;

	getUserApi(token : Token) : UserApi;

} 
