"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiryTemplate = void 0;
const expiryTemplate = (name) => `
  <h1>Account Expired, ${name}!</h1>
  <p>Your account has expired. Please renew to continue using our services.</p>
`;
exports.expiryTemplate = expiryTemplate;
