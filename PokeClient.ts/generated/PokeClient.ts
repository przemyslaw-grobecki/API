
import IPokeClient from "./IPokeClient";
import axios from "axios";
import { Token, Role } from "../IUserAuthentication";
import CourseApi from "../generated/apis/CourseApi";
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
        const loginResponse = await axios.post(this.endpoint + "/auth/login", {}, {
            auth:{
                username: username,
                password: password
            }
        });
        return loginResponse.data;
    }
    
    public async Register(email : string, password : string, firstName : string, lastName: string, role : Role): Promise<void> {
        await axios.post(this.endpoint + "/auth/register", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role: role
        });
    }

	getCourseApi(token : Token) : CourseApi {
                    return new CourseApi(this.endpoint + "/api", token);
                }

	getLeagueApi(token : Token) : LeagueApi {
                    return new LeagueApi(this.endpoint + "/api", token);
                }

	getPokemonApi(token : Token) : PokemonApi {
                    return new PokemonApi(this.endpoint + "/api", token);
                }

	getUserApi(token : Token) : UserApi {
                    return new UserApi(this.endpoint + "/api", token);
                }

} 
