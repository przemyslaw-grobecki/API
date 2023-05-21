import IPokeClient from "./IPokeClient";
import MoveApi from "../generated/apis/MoveApi";
import PokemonApi from "../generated/apis/PokemonApi";

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
