import axios, {isCancel, AxiosError, AxiosRequestConfig} from 'axios';
import { Token } from './generated/PokeClient';

export default abstract class BaseApi<T> {
    priorPath: string;

    public constructor(priorPath: string = "", token : Token){
        this.priorPath = priorPath;
        this.axiosConfig = {
            data: {
                token: token
            }
        }
    }

    /**
     * Axios config of base poke resource
     */
    private axiosConfig : AxiosRequestConfig = {

    };

    /**
     * Https get
     * @param route 
     * @returns get 
     */
    protected async HttpGetAll(route: string) : Promise<Array<T>> {
        const resource = await axios.get<Array<T>>(route, this.axiosConfig);
        return resource.data;
    }

    /**
     * Https get
     * @param route 
     * @returns get 
     */
    protected async HttpGet(route: string) : Promise<T> {
        const resource = await axios.get<T>(route, this.axiosConfig);
        return resource.data;
    }

    /**
     * Https post
     * @param route 
     */
    protected async HttpPost(route: string, data: T) : Promise<void> {
        await axios.post(route, data, this.axiosConfig);
    }

    /**
     * Https delete
     * @param route 
     */
    protected async HttpDelete(route: string) : Promise<void> {
        await axios.delete(route, this.axiosConfig);
    }

    /**
     * Https patch
     * @param route 
     */
    protected async HttpPatch(route: string, patch: T) : Promise<T> {
        return await axios.patch(route, patch, this.axiosConfig);
    }
}