
import IPokeClient from "./IPokeClient";
import axios from "axios";
import { Token } from "../IUserAuthentication";
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

    public async Login(username : string, password : string): Promise<Token> {
        return await axios.post(this.endpoint + "/login", {
            username: username,
            password: password
        });
    }
    
    public async Register(email : string, password : string, firstName : string, lastName: string): Promise<Token> {
        return await axios.post(this.endpoint + "/register", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });
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
