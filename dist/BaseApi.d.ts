import { AxiosRequestConfig } from 'axios';
import { Token } from './IUserAuthentication';
export default abstract class BaseApi<T> {
    /**
     * Axios config of base poke resource
     */
    axiosConfig: AxiosRequestConfig;
    priorPath: string;
    constructor(priorPath: string | undefined, token: Token);
    refreshToken(token: Token): void;
    /**
     * Https get
     * @param route
     * @returns get
     */
    protected HttpGetAll(route: string): Promise<Array<T>>;
    /**
     * Https get
     * @param route
     * @returns get
     */
    protected HttpGet(route: string): Promise<T>;
    /**
     * Https post
     * @param route
     */
    protected HttpPost(route: string, data: T): Promise<void>;
    /**
     * Https delete
     * @param route
     */
    protected HttpDelete(route: string): Promise<void>;
    /**
     * Https patch
     * @param route
     */
    protected HttpPatch(route: string, patch: T): Promise<T>;
}
