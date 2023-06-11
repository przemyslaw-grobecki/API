export type Token = string | undefined;
export type Role = string | undefined;

export default interface IUserAuthentication {
    Login(username : string, password : string) : Promise<Token>;
    Register(email : string, password : string, firstName : string, lastName: string, role : Role) : Promise<void>;
}