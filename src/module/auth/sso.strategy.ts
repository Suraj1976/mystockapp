import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-saml';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const cert = configService.get<string>('SAML_CERT');
    const privateKey = configService.get<string>('SAML_PRIVATE_KEY');

    // cert की जाँच करें
    if (!cert) {
      throw new InternalServerErrorException('SAML_CERT is required for SAML configuration');
    }

    super({
      entryPoint: configService.get<string>('SAML_ENTRY_POINT'),
      issuer: configService.get<string>('SAML_ISSUER'),
      callbackUrl: configService.get<string>('SAML_CALLBACK_URL'),
      cert: cert,
      identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:emailAddress',
      decryptionPvk: privateKey || undefined,
      privateKey: privateKey || undefined,
      acceptedClockSkewMs: -1,
    });
  }

  async validate(profile: any) {
    const email = profile.email || profile['urn:oid:0.9.2342.19200300.100.1.3'];
    const user = { email, role: 'USER' };
    return this.authService.generateJwtForSso(user);
  }
}