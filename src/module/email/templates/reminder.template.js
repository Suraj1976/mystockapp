"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reminderTemplate = void 0;
const reminderTemplate = (name, days) => `
  <h1>Reminder, ${name}!</h1>
  <p>Your account will expire in ${days} days. Please renew soon.</p>
`;
exports.reminderTemplate = reminderTemplate;
