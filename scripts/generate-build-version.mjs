import { writeFileSync, readFileSync } from 'node:fs';

// ---------------------------------------------------------------------------
// Word lists for the random version codename
// ---------------------------------------------------------------------------
const ADJECTIVES = [
  'amber', 'ancient', 'arctic', 'atomic', 'azure',
  'bold', 'brave', 'bright', 'bronze', 'burning',
  'calm', 'cobalt', 'cosmic', 'crimson', 'crystal',
  'dark', 'daring', 'dawn', 'digital', 'distant',
  'electric', 'emerald', 'endless', 'epic', 'eternal',
  'fierce', 'flying', 'frozen', 'frosty', 'furious',
  'galactic', 'ghostly', 'glowing', 'golden', 'grand',
  'hidden', 'hollow', 'hyper', 'icy', 'infinite',
  'iron', 'jade', 'keen', 'legendary', 'lightning',
  'lunar', 'magnetic', 'mighty', 'misty', 'nebula',
  'neon', 'noble', 'obsidian', 'onyx', 'orbital',
  'phantom', 'primal', 'quantum', 'radiant', 'rapid',
  'rogue', 'ruby', 'rustic', 'savage', 'scarlet',
  'shining', 'silent', 'silver', 'solar', 'sonic',
  'spectral', 'steel', 'stellar', 'stormy', 'swift',
  'thunder', 'tidal', 'titan', 'twilight', 'ultra',
  'valiant', 'velvet', 'vibrant', 'violet', 'vivid',
  'wandering', 'wild', 'winter', 'wise', 'zenith',
];

const ANIMALS = [
  'albatross', 'antelope', 'badger', 'bat', 'bear',
  'bison', 'boar', 'buffalo', 'bull', 'butterfly',
  'caracal', 'cheetah', 'cobra', 'condor', 'cougar',
  'crane', 'crow', 'deer', 'dingo', 'dolphin',
  'dragon', 'eagle', 'falcon', 'ferret', 'firefly',
  'fox', 'frog', 'gecko', 'gorilla', 'grizzly',
  'hawk', 'heron', 'horse', 'hummingbird', 'hyena',
  'ibis', 'iguana', 'jackal', 'jaguar', 'jellyfish',
  'kestrel', 'kingfisher', 'kite', 'komodo', 'leopard',
  'lion', 'lizard', 'lynx', 'mamba', 'mantis',
  'marlin', 'mink', 'mongoose', 'moose', 'moth',
  'mustang', 'narwhal', 'ocelot', 'osprey', 'otter',
  'owl', 'panther', 'parrot', 'penguin', 'phoenix',
  'piranha', 'puma', 'python', 'raven', 'rhino',
  'salamander', 'salmon', 'scorpion', 'serpent', 'shark',
  'snowy-owl', 'sparrow', 'spider', 'stallion', 'stork',
  'swift', 'tiger', 'toad', 'toucan', 'viper',
  'vulture', 'walrus', 'weasel', 'wolf', 'wolverine',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomCodename() {
  return `${pick(ADJECTIVES)}-${pick(ANIMALS)}`;
}

// ---------------------------------------------------------------------------
// Read current version from package.json and bump the patch number
// ---------------------------------------------------------------------------
const pkgPath = new URL('../package.json', import.meta.url).pathname;
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

const [major, minor, patch] = pkg.version.split('.').map(Number);
const newPatch = patch + 1;
const newSemver = `${major}.${minor}.${newPatch}`;

pkg.version = newSemver;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

// ---------------------------------------------------------------------------
// Build the full version string and write .env.production.local
// ---------------------------------------------------------------------------
const codename = randomCodename();
const appVersion = `v${newSemver}-${codename}`;

const content = [
  `VITE_APP_VERSION=${appVersion}`,
  `VITE_BUILD_CODENAME=${codename}`,
  '',
].join('\n');

writeFileSync('.env.production.local', content, 'utf8');

console.log(`Generated build version: ${appVersion}`);
