/**
 * A user.
 */
export interface User {
    /**
     * email
     */
    email: string;
    /**
     * hash
     */
    hash: string;
    /**
     * The unique identifier for a user
     */
    id: number;
    /**
     * Password
     */
    password: string;
    /**
     * Saltyness
     */
    salt: string;
    /**
     * username
     */
    username: string;
    [property: string]: any;
}
export declare class UserConverter {
    static toUser(json: string): User;
    static userToJson(value: User): string;
}
