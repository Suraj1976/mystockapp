const bcrypt = require('bcrypt');

async function checkPassword() {
  const storedHash = '$2b$10$Z0yQ1dYV4z7I3eA7ROlzUehvUd8VLqM6ZYu7oxuKfV7CKJxZBcG0K';
  const password = 'super123';
  const isMatch = await bcrypt.compare(password, storedHash);
  console.log('Password match:', isMatch);
}

checkPassword();