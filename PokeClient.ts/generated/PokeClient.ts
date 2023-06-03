import IPokeClient from "./IPokeClient";
import LeagueApi from "../generated/apis/LeagueApi";
import MoveApi from "../generated/apis/MoveApi";
import PokemonApi from "../generated/apis/PokemonApi";
import UserApi from "../generated/apis/UserApi";

export type Token = string | undefined;
            
export default class PokeClient implements IPokeClient 
{
    public endpoint: string;
    public constructor(host : string, port : string){
        this.endpoint = "http://" + host + ":" + port;
    }

    public Login(): Token {
        throw new Error("Method not implemented."); //TODO: OAUTH
    }
    
    public Register(): Token {
        throw new Error("Method not implemented."); //TODO: OAUTH
    }

	getLeagueApi(token : Token) : LeagueApi {
                    return new LeagueApi(this.endpoint, token);
                }

	getPokemonApi(token : Token) : PokemonApi {
                    return new PokemonApi(this.endpoint, token);
                }

	getUserApi(token : Token) : UserApi {
                    return new UserApi(this.endpoint, token);
                }

} 
