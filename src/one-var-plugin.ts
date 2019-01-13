import * as espree from "espree";
import traverse from "babel-traverse";
import * as fs from "fs";

export function fixer(code) {
    const ast = espree.parse(code, {
        ecmaVersion: 6,
    });
    console.log(ast);
    fs.writeFileSync('src/result.json', JSON.stringify(ast,null, 4), 'utf8');
}
