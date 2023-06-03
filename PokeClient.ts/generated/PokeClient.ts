import IPokeClient from "./IPokeClient";
import LeagueApi from "../generated/apis/LeagueApi";
import MoveApi from "../generated/apis/MoveApi";
import PokemonApi from "../generated/apis/PokemonApi";
import UserApi from "../generated/apis/UserApi";

export default class PokeClient implements IPokeClient 
{
    public endpoint: string;
    public constructor(host : string, port : string){
        this.endpoint = "http://" + host + ":" + port;
    }

    public Login(): void {
        throw new Error("Method not implemented."); //TODO: OAUTH
    }
    
    public Register(): void {
        throw new Error("Method not implemented."); //TODO: OAUTH
    }

	getLeagueApi() : LeagueApi {
                    return new LeagueApi(this.endpoint);
                }

	getPokemonApi() : PokemonApi {
                    return new PokemonApi(this.endpoint);
                }

	getUserApi() : UserApi {
                    return new UserApi(this.endpoint);
                }

} 
