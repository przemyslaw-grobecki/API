export type Token = string | undefined;

export default interface IUserAuthentication {
    Login(username : string, password : string) : Promise<Token>;
    Register(email : string, password : string, firstName : string, lastName: string) : Promise<Token>;
}