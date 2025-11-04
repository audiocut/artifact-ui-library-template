import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the config file
const configPath = join(__dirname, '../config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

console.log(`Current mode: ${config.mode}`);

if (config.mode !== 'prod') {
  console.log('⚠️  Build skipped: Mode is not set to "prod"');
  console.log('💡 To build the library, set "mode": "prod" in config.json');
  process.exit(0);
}

console.log('✅ Building library in production mode...');
execSync('tsc -b && vite build', { stdio: 'inherit' });
