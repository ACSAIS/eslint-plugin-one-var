import fs from "fs";
import {fixer} from "./src/one-var-plugin.js";

fs.readFile('src/wrong.js', 'utf8', (err, data) => {
    fixer(data);
});
