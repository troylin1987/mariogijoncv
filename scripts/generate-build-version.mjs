import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const BASE_VERSION = process.env.APP_BASE_VERSION ?? 'v1.0.0';
const buildUuid = randomUUID().replace(/-/g, '').slice(0, 12);
const appVersion = `${BASE_VERSION}-${buildUuid}`;

const content = [`VITE_APP_VERSION=${appVersion}`, `VITE_BUILD_UUID=${buildUuid}`, ''].join('\n');
writeFileSync('.env.production.local', content, 'utf8');

console.log(`Generated build version: ${appVersion}`);