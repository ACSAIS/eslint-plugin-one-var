import * as fs from 'fs';
import {fixer} from './src/one-var-plugin';

fs.readFile('src/wrong.js', 'utf8', (err, data) => {
    fixer(data);
});
