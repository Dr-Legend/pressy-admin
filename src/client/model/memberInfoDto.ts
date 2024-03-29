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
import { AddressDto } from './addressDto';
import { PaymentAccountDto } from './paymentAccountDto';


/**
 * 
 */
export interface MemberInfoDto { 
    /**
     * 
     */
    addresses: Array<AddressDto>;
    /**
     * 
     */
    paymentAccounts: Array<PaymentAccountDto>;
    /**
     * 
     */
    id: number;
    /**
     * 
     */
    firstName: string;
    /**
     * 
     */
    lastName: string;
    /**
     * 
     */
    email: string;
    /**
     * 
     */
    phone: string;
    /**
     * 
     */
    created: Date;
}
