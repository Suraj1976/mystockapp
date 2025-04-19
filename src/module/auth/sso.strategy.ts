import { Strategy, VerifyWithoutRequest } from '@node-saml/passport-saml';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor(configService: ConfigService) {
    const entryPoint = configService.get<string>('SAML_ENTRY_POINT');
    const issuer = configService.get<string>('SAML_ISSUER');
    const callbackUrl = configService.get<string>('SAML_CALLBACK_URL');
    const idpCert = configService.get<string>('SAML_CERT');
    const decryptionPvk = configService.get<string>('SAML_PRIVATE_KEY');

    const verify: VerifyWithoutRequest = async (profile: any, done) => {
      const user = {
        email: profile.email || profile['urn:oid:0.9.2342.19200300.100.1.3'],
        firstName: profile.givenName || profile['urn:oid:2.5.4.42'],
        lastName: profile.sn || profile['urn:oid:2.5.4.4'],
      };
      done(null, user);
    };

    super(
      {
        entryPoint,
        issuer,
        callbackUrl,
        idpCert,
        decryptionPvk: decryptionPvk || undefined,
        authnRequestBinding: 'HTTP-Redirect',
        acceptedClockSkewMs: -1,
        identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
      },
      verify,
    );
  }

  async validate(profile: any, done: (err: any, user?: any) => void): Promise<void> {
    const user = {
      email: profile.email || profile['urn:oid:0.9.2342.19200300.100.1.3'],
      firstName: profile.givenName || profile['urn:oid:2.5.4.42'],
      lastName: profile.sn || profile['urn:oid:2.5.4.4'],
    };
    done(null, user);
  }
}