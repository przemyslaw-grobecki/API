
import IUserAuthentication, { Token, Role } from "../IUserAuthentication";
import CourseApi from "../generated/apis/CourseApi";
import LeagueApi from "../generated/apis/LeagueApi";
import MoveApi from "../generated/apis/MoveApi";
import PokemonApi from "../generated/apis/PokemonApi";
import UserApi from "../generated/apis/UserApi";


export default interface IPokeClient extends IUserAuthentication 
{
	getCourseApi(token : Token) : CourseApi;

	getLeagueApi(token : Token) : LeagueApi;

	getPokemonApi(token : Token) : PokemonApi;

	getUserApi(token : Token) : UserApi;
} 
