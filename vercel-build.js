const { execSync } = require('child_process');

try {
  // Run Prisma generate command
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running Prisma generate command:', error);
  process.exit(1);
}
