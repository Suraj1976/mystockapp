"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamlStrategy = void 0;
const passport_saml_1 = require("@node-saml/passport-saml");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SamlStrategy = class SamlStrategy extends (0, passport_1.PassportStrategy)(passport_saml_1.Strategy, 'saml') {
    constructor(configService) {
        const entryPoint = configService.get('SAML_ENTRY_POINT');
        const issuer = configService.get('SAML_ISSUER');
        const callbackUrl = configService.get('SAML_CALLBACK_URL');
        const idpCert = configService.get('SAML_CERT');
        const decryptionPvk = configService.get('SAML_PRIVATE_KEY');
        const verify = async (profile, done) => {
            const user = {
                email: profile.email || profile['urn:oid:0.9.2342.19200300.100.1.3'],
                firstName: profile.givenName || profile['urn:oid:2.5.4.42'],
                lastName: profile.sn || profile['urn:oid:2.5.4.4'],
            };
            done(null, user);
        };
        super({
            entryPoint,
            issuer,
            callbackUrl,
            idpCert,
            decryptionPvk: decryptionPvk || undefined,
            authnRequestBinding: 'HTTP-Redirect',
            acceptedClockSkewMs: -1,
            identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
        }, verify);
    }
    async validate(profile, done) {
        const user = {
            email: profile.email || profile['urn:oid:0.9.2342.19200300.100.1.3'],
            firstName: profile.givenName || profile['urn:oid:2.5.4.42'],
            lastName: profile.sn || profile['urn:oid:2.5.4.4'],
        };
        done(null, user);
    }
};
exports.SamlStrategy = SamlStrategy;
exports.SamlStrategy = SamlStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SamlStrategy);
