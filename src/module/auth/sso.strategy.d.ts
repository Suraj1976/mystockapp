import { Strategy, VerifyWithoutRequest } from '@node-saml/passport-saml';
import { ConfigService } from '@nestjs/config';
declare const SamlStrategy_base: new (...args: [options: import("@node-saml/passport-saml").PassportSamlConfig, signonVerify: VerifyWithoutRequest] | [options: import("@node-saml/passport-saml").PassportSamlConfig, signonVerify: import("@node-saml/passport-saml").VerifyWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class SamlStrategy extends SamlStrategy_base {
    constructor(configService: ConfigService);
    validate(profile: any, done: (err: any, user?: any) => void): Promise<void>;
}
export {};
