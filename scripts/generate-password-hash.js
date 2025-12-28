/**
 * Utility script to generate bcrypt hash for admin password
 * 
 * NOTE: This script is no longer used as we now use Firebase Remote Config
 * for password storage. Keeping for reference only.
 * 
 * Usage: node scripts/generate-password-hash.js <your-password>
 * 
 * This will output a hash that you can use in ADMIN_PASSWORD_HASH environment variable
 * (if using environment variable authentication - which is deprecated)
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/generate-password-hash.js <your-password>');
  console.error('\nNote: This script is deprecated. Use Firebase Remote Config instead.');
  console.error('See ADMIN_AUTH_README.md for setup instructions.');
  process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  
  console.log('\n⚠️  DEPRECATED: This method is no longer used.');
  console.log('Please use Firebase Remote Config for password storage.\n');
  console.log('Hash generated (for reference only):');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
  console.log('See ADMIN_AUTH_README.md for Firebase Remote Config setup.\n');
});
