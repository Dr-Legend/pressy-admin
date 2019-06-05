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


/**
 * 
 */
export interface AuthCredentialsDto { 
    /**
     * 
     */
    accessToken: string;
    /**
     * 
     */
    refreshToken: string;
    /**
     * 
     */
    type: AuthCredentialsDto.TypeEnum;
    /**
     * 
     */
    expiresIn: number;
}
export namespace AuthCredentialsDto {
    export type TypeEnum = 'Bearer';
    export const TypeEnum = {
        Bearer: 'Bearer' as TypeEnum
    }
}