
import IUserAuthentication from "./IUserAuthentication";
import MoveApi from "../apis/MoveApi";
import PokemonApi from "../apis/PokemonApi";

export default interface IPokeClient extends IUserAuthentication 
{
    Login() : void;
    Register(): void;

	getPokemonApi() : PokemonApi;

} 
