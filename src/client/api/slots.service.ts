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

import { CreateSlotRequestDto } from '../model/createSlotRequestDto';
import { DeleteSlotRequest } from '../model/deleteSlotRequest';
import { EditSlotRequestDto } from '../model/editSlotRequestDto';
import { SlotDto } from '../model/slotDto';
import { TYPES } from "../variables";


@injectable()
export class SlotsService {
    
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
    public async slotCreateSlot(request: CreateSlotRequestDto, headers?: Headers): Promise<SlotDto>;
    public async slotCreateSlot(request: CreateSlotRequestDto, headers?: Headers): Promise<HttpResponse<SlotDto>>;
    public async slotCreateSlot(request: CreateSlotRequestDto, headers: Headers = {}): Promise<any> {
        if (!request){
            throw new Error('Required parameter request was null or undefined when calling slotCreateSlot.');
        }

        // authentication (Bearer) required
        if (this.APIConfiguration.apiKeys["Authorization"]) {
            headers['Authorization'] = this.APIConfiguration.apiKeys["Authorization"];
        }
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        let response = await this.httpClient.post(`${this.basePath}/slot`, request , headers);
        return response.response;
    }


    /**
     * 
     * 
     * @param request 
     
     */
    public async slotDeleteSlot(request: DeleteSlotRequest, headers?: Headers): Promise<any>;
    public async slotDeleteSlot(request: DeleteSlotRequest, headers?: Headers): Promise<HttpResponse<any>>;
    public async slotDeleteSlot(request: DeleteSlotRequest, headers: Headers = {}): Promise<any> {
        if (!request){
            throw new Error('Required parameter request was null or undefined when calling slotDeleteSlot.');
        }

        // authentication (Bearer) required
        if (this.APIConfiguration.apiKeys["Authorization"]) {
            headers['Authorization'] = this.APIConfiguration.apiKeys["Authorization"];
        }
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        let response = await this.httpClient.delete(`${this.basePath}/slot`, request , headers);
        return response.response;
    }


    /**
     * 
     * 
     * @param request 
     
     */
    public async slotEditSlot(request: EditSlotRequestDto, headers?: Headers): Promise<SlotDto>;
    public async slotEditSlot(request: EditSlotRequestDto, headers?: Headers): Promise<HttpResponse<SlotDto>>;
    public async slotEditSlot(request: EditSlotRequestDto, headers: Headers = {}): Promise<any> {
        if (!request){
            throw new Error('Required parameter request was null or undefined when calling slotEditSlot.');
        }

        // authentication (Bearer) required
        if (this.APIConfiguration.apiKeys["Authorization"]) {
            headers['Authorization'] = this.APIConfiguration.apiKeys["Authorization"];
        }
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        let response = await this.httpClient.patch(`${this.basePath}/slot`, request , headers);
        return response.response;
    }


    /**
     * 
     * 
     * @param type 
     
     */
    public async slotGetSlots(type?: string, headers?: Headers): Promise<Array<SlotDto>>;
    public async slotGetSlots(type?: string, headers?: Headers): Promise<HttpResponse<Array<SlotDto>>>;
    public async slotGetSlots(type?: string, headers: Headers = {}): Promise<any> {
        let queryParameters: string[] = [];
        if (type !== undefined) {
            queryParameters.push("type="+encodeURIComponent(String(type)));
        }

        // authentication (Bearer) required
        if (this.APIConfiguration.apiKeys["Authorization"]) {
            headers['Authorization'] = this.APIConfiguration.apiKeys["Authorization"];
        }
        headers['Accept'] = 'application/json';

        let response = await this.httpClient.get(`${this.basePath}/slot?${queryParameters.join('&')}`, headers);
        return response.response;
    }

}
