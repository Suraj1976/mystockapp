const bcrypt = require('bcrypt');

async function hashPassword() {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash('newsuper123', salt);
  console.log(hash);
}

hashPassword();