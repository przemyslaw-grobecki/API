
import IUserAuthentication from "./IUserAuthentication";
import MoveApi from "../generated/apis/MoveApi";
import PokemonApi from "../generated/apis/PokemonApi";

export default interface IPokeClient extends IUserAuthentication 
{
    Login() : void;
    Register(): void;

	getPokemonApi() : PokemonApi;

} 
