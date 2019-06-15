import HttpResponse from "./HttpResponse";
import { Headers } from "./Headers";

interface IHttpClient {
    get(url:string, headers?: Headers):Promise<HttpResponse>
    post(url:string, body:{}|FormData, headers?: Headers):Promise<HttpResponse>
    put(url:string, body:{}, headers?: Headers):Promise<HttpResponse>
    patch(url: string, body: {}, headers?: Headers): Promise<HttpResponse>
    delete(url: string, body: {}, headers?: Headers):Promise<HttpResponse>
}

export default IHttpClient