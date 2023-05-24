import IPokeClient from "./IPokeClient";
import LeagueApi from "../generated/apis/LeagueApi";
import MoveApi from "../generated/apis/MoveApi";
import PokemonApi from "../generated/apis/PokemonApi";
import UserApi from "../generated/apis/UserApi";

export default class PokeClient implements IPokeClient 
{
    public constructor(){}

    public Login(): void {
        throw new Error("Method not implemented."); //TODO: OAUTH
    }
    
    public Register(): void {
        throw new Error("Method not implemented."); //TODO: OAUTH
    }

	getLeagueApi() : LeagueApi {
                    return new LeagueApi();
                }

	getPokemonApi() : PokemonApi {
                    return new PokemonApi();
                }

	getUserApi() : UserApi {
                    return new UserApi();
                }

} 
