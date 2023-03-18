import IUserAuthentication from "./IUserAuthentication";

export default interface IPokeClient extends IUserAuthentication
{
    Login() : void;
    Register(): void;
}