import IHttpClient from "./IHttpClient";
import "whatwg-fetch";
import HttpResponse from "./HttpResponse";
import {injectable} from "inversify";
import { Headers } from "./Headers";
import axios, { Method } from "axios";

@injectable()
class HttpClient implements IHttpClient {

    get(url:string, headers?: Headers):Promise<HttpResponse> {
        return this.performNetworkCall(url, "GET", undefined, headers);
    }

    post(url: string, body: {}|FormData, headers?: Headers): Promise<HttpResponse> {
        return this.performNetworkCall(url, "POST", this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    put(url: string, body: {}, headers?: Headers): Promise<HttpResponse> {
        return this.performNetworkCall(url, "PUT", this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    patch(url: string, body: {}, headers?: Headers): Promise<HttpResponse> {
        return this.performNetworkCall(url, "PATCH", this.getJsonBody(body), this.addJsonHeaders(headers));
    }

    delete(url: string, body: {}, headers?: Headers): Promise<HttpResponse> {
        return this.performNetworkCall(url, "DELETE", this.getJsonBody(body), headers);
    }

    private getJsonBody(body: {}|FormData) {
        return !(body instanceof FormData) ? JSON.stringify(body) : body;
    }

    private addJsonHeaders(headers: Headers) {
        return Object.assign({}, {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, headers);
    };

    private performNetworkCall(url: string, method: string, body?: any, headers?: Headers): Promise<HttpResponse> {
        let promise = axios.request({
            method: method as Method,
            url: url,
            headers: headers,
            data: body
        })
        .then(response => {
            let headers: Headers = {};
            let contentType = headers["content-type"] || "";
            let payload = contentType.match("application/json") ? JSON.parse(response.data) : response.data;
            let httpResponse = new HttpResponse(payload, response.status, headers);

            if (response.status >= 400)
                throw httpResponse;
            return httpResponse;
        });
        promise.catch(error => {
            console.log(error);
        });
        return promise
    }
}

export default HttpClient