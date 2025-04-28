/* const path = require('path'); */
import path from 'path';
/* const { release, version } = require('os'); */
import { release, version } from 'os';
/* const { createServer: createServerHttp } = require('http'); */
import { createServer as createServerHttp } from 'http';
/* require('./files/c'); */
import './files/c.cjs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    /* unknownObject = require('./files/a.json'); */
    unknownObject = await import('./files/a.json', { assert: { type: 'json' } }).then(module => module.default);
} else {
    // unknownObject = require('./files/b.json');
    unknownObject = await import('./files/b.json', { assert: { type: 'json' } }).then(module => module.default);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

// module.exports = { unknownObject, myServer, };
export { unknownObject, myServer };

