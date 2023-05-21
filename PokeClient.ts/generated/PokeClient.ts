import IPokeClient from "./IPokeClient";
import MoveApi from "../apis/MoveApi";
import PokemonApi from "../apis/PokemonApi";

export default class PokeClient implements IPokeClient 
{
    public constructor(){}

    public Login(): void {
        throw new Error("Method not implemented."); //TODO: OAUTH
    }
    
    public Register(): void {
        throw new Error("Method not implemented."); //TODO: OAUTH
    }

	getPokemonApi() : PokemonApi {
                    return new PokemonApi();
                }

} 
