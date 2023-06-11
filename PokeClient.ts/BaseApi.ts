import axios, {isCancel, AxiosError, AxiosRequestConfig} from 'axios';
import { Token } from './IUserAuthentication';


export default abstract class BaseApi<T> {
    /**
     * Axios config of base poke resource
     */
    public axiosConfig : AxiosRequestConfig;
    public priorPath: string;
    
    public constructor(priorPath: string = "", token : Token){
        this.priorPath = priorPath;
        this.axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    public refreshToken(token : Token) {
        this.axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    };

    /**
     * Https get
     * @param route 
     * @returns get 
     */
    protected async HttpGetAll(route: string) : Promise<Array<T>> {
        const resourceResponse = await axios.get<Array<T>>(this.priorPath + route, this.axiosConfig);
        return resourceResponse.data;
    }

    /**
     * Https get
     * @param route 
     * @returns get 
     */
    protected async HttpGet(route: string) : Promise<T> {
        const resourceResponse = await axios.get<T>(this.priorPath + route, this.axiosConfig);
        return resourceResponse.data;
    }

    /**
     * Https post
     * @param route 
     */
    protected async HttpPost(route: string, data: T) : Promise<void> {
        await axios.post(this.priorPath + route, data, this.axiosConfig);
    }

    /**
     * Https delete
     * @param route 
     */
    protected async HttpDelete(route: string) : Promise<void> {
        await axios.delete(this.priorPath + route, this.axiosConfig);
    }

    /**
     * Https patch
     * @param route 
     */
    protected async HttpPatch(route: string, patch: T) : Promise<T> {
        const patchedResourceResponse = await axios.patch(this.priorPath + route, patch, this.axiosConfig);
        return patchedResourceResponse.data;
    }
}