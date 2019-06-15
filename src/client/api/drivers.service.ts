/**
 * Pressy Admin API
 * Cœur du système pressy
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import IHttpClient from "../IHttpClient";
import { inject, injectable } from "inversify";
import { IAPIConfiguration } from "../IAPIConfiguration";
import { Headers } from "../Headers";
import HttpResponse from "../HttpResponse";

import { CreatePersonRequestDto } from '../model/createPersonRequestDto';
import { TYPES } from "../variables";

@injectable()
export class DriversService {
    
    @inject(TYPES.IApiHttpClient) private httpClient: IHttpClient;
    @inject(TYPES.IAPIConfiguration) private APIConfiguration: IAPIConfiguration;
    get basePath(): string {
        return this.APIConfiguration.basePath || 'https://pressy-admin-api-dev.herokuapp.com/v1';
    }

    /**
     * 
     * 
     * @param request 
     
     */
    public async driverCreateDriver(request: CreatePersonRequestDto, headers?: Headers): Promise<any>;
    public async driverCreateDriver(request: CreatePersonRequestDto, headers?: Headers): Promise<HttpResponse<any>>;
    public async driverCreateDriver(request: CreatePersonRequestDto, headers: Headers = {}): Promise<any> {
        if (!request){
            throw new Error('Required parameter request was null or undefined when calling driverCreateDriver.');
        }

        // authentication (Bearer) required
        if (this.APIConfiguration.apiKeys["Authorization"]) {
            headers['Authorization'] = this.APIConfiguration.apiKeys["Authorization"];
        }
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        let response = await this.httpClient.post(`${this.basePath}/driver`, request, headers);
        return response.response;
    }

}
