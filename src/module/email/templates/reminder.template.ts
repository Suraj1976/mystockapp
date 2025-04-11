export const reminderTemplate = (name: string, days: number) => `
  <h1>Reminder, ${name}!</h1>
  <p>Your account will expire in ${days} days. Please renew soon.</p>
`;